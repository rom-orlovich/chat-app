import { Server, Socket } from "socket.io";
import { getEventName } from "../lib/events";
import { createMessageInDB, Message } from "../mongoDB/handlers/messages";

export const GLOBAL_CHAT_ID = "global_chat";

export const loginUsers = new Set();
const getLoginUsers = () => [...loginUsers];
export const socketHandlers = (io: InstanceType<typeof Server>) => {
  io.on(getEventName("CONNECTION"), (socket: Socket) => {
    console.log("Client connect", socket.id);

    socket.on(getEventName("JOIN_CHAT"), async (username) => {
      socket.join(GLOBAL_CHAT_ID);
      console.log(`User ${username} join to chat`);
      loginUsers.add(username);
      console.log(getLoginUsers());
      io.to(GLOBAL_CHAT_ID).emit(
        getEventName("BROADCAST_NEW_CHAT_JOINS"),
        `User ${username} join to chat`
      );
      io.to(GLOBAL_CHAT_ID).emit(
        getEventName("BROADCAST_CURRENT_LOGIN_USERS"),
        getLoginUsers()
      );
    });

    socket.on(getEventName("LEAVE_CHAT"), async (username) => {
      socket.leave(GLOBAL_CHAT_ID);
      console.log(`User ${username} left the chat`);
      loginUsers.delete(username);
      console.log(loginUsers.has(username), username);
      io.emit(
        getEventName("BROADCAST_CHAT_LEAVING"),
        `User ${username} left the chat`
      );
      console.log(getLoginUsers());
      io.to(GLOBAL_CHAT_ID).emit(
        getEventName("BROADCAST_CURRENT_LOGIN_USERS"),
        getLoginUsers()
      );
    });

    // socket.on(getEventName("SEND_MESSAGE"), async (data: Message) => {
    //   console.log(data);
    //   const message = {
    //     ...data,
    //     chatID: GLOBAL_CHAT_ID,
    //     messageID: String(new Date(data.createdAt).getTime()),
    //   };

    //   const res = await createMessageInDB(message);
    //   if (res) {
    //     console.log(res);
    //     io.to(GLOBAL_CHAT_ID).emit(getEventName("BROADCAST_NEW_MESSAGE"), message);
    //   }
    // });

    socket.on(getEventName("DISCONNECT"), () => {
      console.log("Client is disconnect", socket.id);
    });
  });
};
