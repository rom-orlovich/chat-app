import { Socket } from "socket.io";
import { Io } from "../../types/express";
import { getEventName } from "../../lib/events";

import {
  MessageToDB,
  createMessageInDB,
} from "../../mongoDB/handlers/messages";
import { getActionMessage } from "../../lib/actionsCodes";
import { createSysMessageObj } from "./utils";

export const GLOBAL_CHAT_ID = "global_chat";

export const handlers = (io: Io, socket: Socket, loginUsers: Set<string>) => {
  const getLoginUsers = () => [...loginUsers];

  const chat = io.to(GLOBAL_CHAT_ID);

  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    await socket.join(GLOBAL_CHAT_ID);

    console.log(getActionMessage("USER_LOGIN")(username));

    // Add the login user.
    loginUsers.add(username);

    // Insert message to db.

    // const message: MessageToDB = createSysMessageObj("USER_LOGIN", username);

    // await createMessageInDB(message);

    // // Emit the message to the client.
    // chat.emit(getEventName("BROADCAST_NEW_MESSAGE"), message);

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  const userLeaveChatHandler = async (username: string) => {
    // Leave socket.
    await socket.leave(GLOBAL_CHAT_ID);
    socket.disconnect();
    console.log(getActionMessage("USER_LOGOUT")(username));

    // Delete the login user.
    loginUsers.delete(username);

    // Insert message to db.
    // const message: MessageToDB = createSysMessageObj("USER_LOGOUT", username);

    // await createMessageInDB(message);

    // // Emit the message to the client.
    // chat.emit(getEventName("BROADCAST_NEW_MESSAGE"), message);

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  return { userJoinChatHandler, userLeaveChatHandler };
};
