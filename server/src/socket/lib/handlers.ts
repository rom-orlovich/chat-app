import { Socket } from "socket.io";
import { Io } from "../../types/express";
import { getEventName } from "../../lib/events";
import { Message } from "../../../mongoDB/handlers/messages";
import { createMessageInDB } from "../../mongoDB/handlers/messages";

export const GLOBAL_CHAT_ID = "global_chat";

export const handlers = (io: Io, socket: Socket, loginUsers: Set<string>) => {
  const getLoginUsers = () => [...loginUsers];

  const chat = io.to(GLOBAL_CHAT_ID);

  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    await socket.join(GLOBAL_CHAT_ID);
    console.log(`User ${username} join to chat`);

    // Add the login user.
    loginUsers.add(username);

    // Insert message to db.
    const createdAt = String(new Date().getTime());
    const message: Message = {
      messageID: createdAt,
      chatID: GLOBAL_CHAT_ID,
      username: "system",
      content: `User ${username} join to chat`,
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
    console.log(`User ${username} left the chat`);

    // Delete the login user.
    loginUsers.delete(username);
    console.log("username", username);
    console.log(getLoginUsers());

    // Insert message to db.
    const createdAt = String(new Date().getTime());
    const message: Message = {
      messageID: createdAt,
      chatID: GLOBAL_CHAT_ID,
      username: "system",
      content: `User ${username} left the chat`,
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
