import { Socket } from "socket.io";

import { Io } from "../../types/express";
import { getEventCode } from "../../lib/events";

import { MessageToDB } from "../../mongoDB/handlers/messages";
import { getActionMessage } from "../../lib/actionsCodes";
import { createMessageByUsingAPI, createSystemMessage } from "./utils";
import { GLOBAL_CHAT_ID } from "../../lib/constants";

/**
 * Create socket event handlers.
 */
export const handlers = (
  io: Io,
  socket: Socket,
  loginUsers: Map<string, string>
) => {
  const getLoginUsers = () => [...loginUsers.values()];

  // Create access to global chat.
  const chat = io.to(GLOBAL_CHAT_ID);

  /**
   Handle user joining chat socket event.
   **/
  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    try {
      await socket.join(GLOBAL_CHAT_ID);
      console.log(getActionMessage("USER_LOGIN")(username));

      // Add the login user.
      loginUsers.set(socket.id, username);

      // Insert message to db.
      const message: MessageToDB = createSystemMessage("USER_LOGIN", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventCode("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle user leaving chat socket event.
   **/
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
      const message: MessageToDB = createSystemMessage("USER_LOGOUT", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventCode("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());

      // Disconnect the socket.
      socket.disconnect();
      console.log(`The client:${socket.id} is disconnect`);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle user typing event.
   **/
  const userTypingHandler = async () => {
    // Get the typing username.
    const username = loginUsers.get(socket.id);
    if (!username) return;

    socket.broadcast
      .to(GLOBAL_CHAT_ID)
      .emit(
        getEventCode("BROADCAST_TYPING"),
        getActionMessage("USER_TYPING")(username)
      );
  };

  return { userJoinChatHandler, userLeaveChatHandler, userTypingHandler };
};
