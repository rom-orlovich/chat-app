import { Server, Socket } from "socket.io";
import { getEventName } from "../lib/events";

import { handlers } from "./lib/handlers";

/**
 * Handle the socket's events.
 */
export const socketHandlers = (
  io: InstanceType<typeof Server>,
  loginUsers: Map<string, string>
) => {
  // Socket listening to connection event.
  io.on(getEventName("CONNECTION"), (socket: Socket) => {
    console.log("Client connect", socket.id);

    // Get the handlers function for the socket's events.
    const { userJoinChatHandler, userLeaveChatHandler, userTypingHandler } =
      handlers(io, socket, loginUsers);

    // Handler for join chat event.
    socket.on(getEventName("JOIN_CHAT"), userJoinChatHandler);

    // Handler for leave chat event.
    socket.on(getEventName("LEAVE_CHAT"), userLeaveChatHandler);

    // Handler for user's typing event.
    socket.on(getEventName("BROADCAST_TYPING"), userTypingHandler);

    // Handler for Disconnect socket event.
    socket.on(getEventName("DISCONNECT"), userLeaveChatHandler);
  });
};
