/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import { config } from "dotenv";
config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { getAppEndpoints } from "./lib/endpoints";

import { client } from "./mongoDB/utils";
import { socketHandlers } from "./socket/socket";
import { getRequestExtendMiddleware } from "./api/middleware/middleware";

import { apiRoutes } from "./api/api";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  try {
    await client.connect();

    // Middleware
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const loginUsers = new Map<string, string>();

    // Socket Handlers.
    socketHandlers(io, loginUsers);

    // Get the ExtendedMiddleware
    const requestExtendMiddleware = getRequestExtendMiddleware(loginUsers);

    // API handlers
    app.use(getAppEndpoints("API_PREFIX"), requestExtendMiddleware, apiRoutes);

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
