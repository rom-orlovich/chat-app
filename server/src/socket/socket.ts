import { Server, Socket } from "socket.io";
import { getEventName } from "../lib/events";

import { handlers } from "./lib/handlers";

export const socketHandlers = (
  io: InstanceType<typeof Server>,
  loginUsers: Set<string>
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

    socket.on(getEventName("DISCONNECT"), () => {
      console.log("Client is disconnect", socket.id);
    });
  });
};
