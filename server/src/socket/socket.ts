import { Server, Socket } from "socket.io";
import { getEventCode } from "../lib/events";

import { handlers } from "./lib/handlers";

/**
 * Handle the socket's events.
 */
export const socketHandlers = (
  io: InstanceType<typeof Server>,
  loginUsers: Map<string, string>
) => {
  // Socket listening to connection event.
  io.on(getEventCode("CONNECTION"), (socket: Socket) => {
    console.log("Client connect", socket.id);

    // Get the handlers function for the socket's events.
    const {
      userJoinChatHandler,
      userLeaveChatHandler,
      userTypingHandler,
      sendingMessageHandler,
    } = handlers(io, socket, loginUsers);

    // Handler for join chat event.
    socket.on(getEventCode("JOIN_CHAT"), userJoinChatHandler);
    // Handler for join chat event.
    socket.on(getEventCode("SEND_MESSAGE"), sendingMessageHandler);

    // Handler for user's typing event.
    socket.on(getEventCode("BROADCAST_TYPING"), userTypingHandler);

    // Handler for leave chat event.
    socket.on(getEventCode("LEAVE_CHAT"), userLeaveChatHandler);

    // Handler for Disconnect socket event.
    socket.on(getEventCode("DISCONNECT"), userLeaveChatHandler);
  });
};
