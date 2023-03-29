import { config } from "dotenv";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import { getEventName } from "./lib/events";

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const GLOBAL_CHAT = "global_chat";

io.on(getEventName("CONNECTION"), (socket: Socket) => {
  console.log("Client connect", socket.id);

  socket.on(getEventName("JOIN_CHAT"), async (data) => {
    socket.join(GLOBAL_CHAT);
    console.log(`User ${data.name} join to chat`);
  });

  socket.on(getEventName("SEND_MESSAGE"), (data) => {
    io.to(GLOBAL_CHAT).emit(getEventName("BROADCAST_MESSAGES"), {
      messageID: String(new Date().getTime()),
      ...data,
    });
  });

  socket.on(getEventName("DISCONNECT"), () => {
    console.log("Client is disconnect", socket.id);
  });
});
server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
