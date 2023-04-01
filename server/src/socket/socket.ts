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

    socket.on(getEventName("DISCONNECT"), async () => {
      const username = loginUsers.get(socket.id);
      loginUsers.delete(socket.id);
      console.log(`The client:${socket.id} is disconnect`);
      if (!username) return;
      await socket.leave(GLOBAL_CHAT_ID);
      console.log(`The user ${username} left the room`);
      console.log("current users", loginUsers);

      const message: MessageToDB = createSysMessageObj(
        "USER_LOGOUT",
        username || ""
      );
      await createMessageByUsingAPI(message);
    });
  });
};
