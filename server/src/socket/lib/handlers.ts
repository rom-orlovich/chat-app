import { Socket } from "socket.io";
import { Io } from "../../types/express";
import { getEventName } from "../../lib/events";
import { Message } from "../../../mongoDB/handlers/messages";
import { createMessageInDB } from "../../mongoDB/handlers/messages";
import { ACTION_MESSAGE, getActionMessage } from "../../lib/actionsCodes";

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
    const createdAt = String(new Date().getTime());
    const message: Message = {
      messageID: createdAt,
      chatID: GLOBAL_CHAT_ID,
      username: "system",
      content: getActionMessage("USER_LOGIN")(username),
      createdAt,
    };

    await createMessageInDB(message);

    // Emit the message to the client.
    chat.emit(getEventName("BROADCAST_NEW_MESSAGE"), message);

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  const userLeaveChatHandler = async (username: string) => {
    // Leave socket.
    await socket.leave(GLOBAL_CHAT_ID);
    console.log(getActionMessage("USER_LOGOUT")(username));

    // Delete the login user.
    loginUsers.delete(username);

    // Insert message to db.
    const createdAt = String(new Date().getTime());
    const message: Message = {
      messageID: createdAt,
      chatID: GLOBAL_CHAT_ID,
      username: "system",
      content: getActionMessage("USER_LOGOUT")(username),
      createdAt,
    };

    await createMessageInDB(message);

    // Emit the message to the client.
    chat.emit(getEventName("BROADCAST_NEW_MESSAGE"), message);

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  return { userJoinChatHandler, userLeaveChatHandler };
};
