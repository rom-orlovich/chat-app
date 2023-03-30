/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import { config } from "dotenv";
config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { getAppEndpoints } from "./lib/endpoints";
import { messageRoutes } from "./api/routes/messages";
import { socketHandlers } from "./socket/socket";
import { client } from "./mongoDB/utils";
import { addSocketMiddleware } from "./api/middleware";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const startServer = async () => {
  try {
    await client.connect();
    socketHandlers(io);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      getAppEndpoints("API_PREFIX"),
      addSocketMiddleware(io),
      messageRoutes
    );

    server.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await client.close();
    io.close();
    server.close();
  }
};

startServer();
