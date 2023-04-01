import { Server, Socket } from "socket.io";
import { getEventName } from "../lib/events";

import { GLOBAL_CHAT_ID, handlers } from "./lib/handlers";
import { MessageToDB } from "../mongoDB/handlers/messages";
import { createMessageByUsingAPI, createSysMessageObj } from "./lib/utils";

export const socketHandlers = (
  io: InstanceType<typeof Server>,
  loginUsers: Map<string, string>
) => {
  io.on(getEventName("CONNECTION"), (socket: Socket) => {
    console.log("Client connect", socket.id);
    const { userJoinChatHandler, userLeaveChatHandler } = handlers(
      io,
      socket,
      loginUsers
    );

    socket.on(getEventName("JOIN_CHAT"), userJoinChatHandler);

    socket.on(getEventName("LEAVE_CHAT"), userLeaveChatHandler);

    socket.on(getEventName("DISCONNECT"), userLeaveChatHandler);
  });
};
