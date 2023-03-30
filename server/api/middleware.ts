import { RequestHandler } from "express";
import { Io } from "../types/express";

export const addSocketMiddleware: (io: Io) => RequestHandler =
  (io) => (req, res, next) => {
    req.io = io;
    next();
  };
