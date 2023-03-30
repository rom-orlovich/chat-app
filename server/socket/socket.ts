import { Server, Socket } from "socket.io";
import { getEventName } from "../lib/events";
import { createMessageInDB, Message } from "../mongoDB/handlers/messages";

export const GLOBAL_CHAT_ID = "global_chat";

export const socketHandlers = (io: InstanceType<typeof Server>) => {
  io.on(getEventName("CONNECTION"), (socket: Socket) => {
    console.log("Client connect", socket.id);

    socket.on(getEventName("JOIN_CHAT"), async (data) => {
      socket.join(GLOBAL_CHAT_ID);
      io.to(GLOBAL_CHAT_ID).emit(
        getEventName("BROADCAST_NEW_CHAT_JOINS"),
        `User ${data} join to chat`
      );
    });

    socket.on(getEventName("SEND_MESSAGE"), async (data: Message) => {
      const message = {
        ...data,
        messageID: String(new Date().getTime()),
      };

      const res = await createMessageInDB(message);
      if (res) {
        console.log(res);
        io.to(GLOBAL_CHAT_ID).emit(getEventName("BROADCAST_MESSAGES"), message);
      }
    });

    socket.on(getEventName("DISCONNECT"), () => {
      console.log("Client is disconnect", socket.id);
    });
  });
};
