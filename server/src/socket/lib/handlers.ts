import { Socket } from "socket.io";

import { Io } from "../../types/express";
import { getEventName } from "../../lib/events";

import { MessageToDB } from "../../mongoDB/handlers/messages";
import { getActionMessage } from "../../lib/actionsCodes";
import { createMessageByUsingAPI, createSysMessageObj } from "./utils";

export const GLOBAL_CHAT_ID = "global_chat";

export const handlers = (
  io: Io,
  socket: Socket,
  loginUsers: Map<string, string>
) => {
  const getLoginUsers = () => [...loginUsers.values()];

  const chat = io.to(GLOBAL_CHAT_ID);

  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    try {
      await socket.join(GLOBAL_CHAT_ID);
      console.log(getActionMessage("USER_LOGIN")(username));

      // Add the login user.
      loginUsers.set(socket.id, username);

      // Insert message to db.
      const message: MessageToDB = createSysMessageObj("USER_LOGIN", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
    } catch (error) {
      console.log(error);
    }
  };

  const userLeaveChatHandler = async () => {
    try {
      // Get the user's username.
      const username = loginUsers.get(socket.id);

      // Check if the user exist.
      if (!username) return;

      // Delete the login user.
      loginUsers.delete(socket.id);

      // Leave socket.
      await socket.leave(GLOBAL_CHAT_ID);

      console.log(getActionMessage("USER_LOGOUT")(username));

      // Insert message to db.
      const message: MessageToDB = createSysMessageObj("USER_LOGOUT", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());

      // Disconnect the socket.
      socket.disconnect();
      console.log(`The client:${socket.id} is disconnect`);
    } catch (error) {
      console.log(error);
    }
  };
  // const disconnectHandler = async () => {
  //   try {
  //     // Get the user's username.
  //     const username = loginUsers.get(socket.id);

  //     // Check if the user exist.
  //     if (!username) return;

  //     // Delete disconnect username.
  //     loginUsers.delete(socket.id);

  //     // Leave socket.
  //     await socket.leave(GLOBAL_CHAT_ID);

  //     console.log(getActionMessage("USER_LOGOUT")(username));

  //     // Insert message to db.
  //     const message: MessageToDB = createSysMessageObj("USER_LOGOUT", username);
  //     await createMessageByUsingAPI(message);

  //     // Disconnect the socket.
  //     socket.disconnect();
  //     console.log(`The client:${socket.id} is disconnect`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return { userJoinChatHandler, userLeaveChatHandler };
};
