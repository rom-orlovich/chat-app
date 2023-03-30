import { Server } from "http";
import { Socket } from "socket.io";
import { getEventName } from "../../lib/events";
import { Io } from "../../types/express";

export const GLOBAL_CHAT_ID = "global_chat";
// export const loginUsers = new Set();

export const handlers = (io: Io, socket: Socket) => {
  const loginUsers = new Set();
  const getLoginUsers = () => [...loginUsers];

  const chat = io.to(GLOBAL_CHAT_ID);

  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    await socket.join(GLOBAL_CHAT_ID);
    console.log(`User ${username} join to chat`);

    // Add the login user.
    loginUsers.add(username);

    // Emit the message to the client.
    chat.emit(
      getEventName("BROADCAST_NEW_CHAT_JOINS"),
      `User ${username} join to chat`
    );

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  const userLeaveChatHandler = async (username: string) => {
    // Leave socket.
    await socket.leave(GLOBAL_CHAT_ID);
    console.log(`User ${username} left the chat`);

    // Delete the login user.
    loginUsers.delete(username);
    console.log(loginUsers.has(username), username);

    // Emit the message to the client.
    chat.emit(
      getEventName("BROADCAST_CHAT_LEAVING"),
      `User ${username} left the chat`
    );

    // Update the client about the current login users.
    chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
  };

  return { userJoinChatHandler, userLeaveChatHandler };
};
