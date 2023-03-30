import { RequestHandler } from "express";
import { Io } from "../types/express";

export const getRequestExtendMiddleware: (
  io: Io,
  loginUsers: Set<string>
) => RequestHandler = (io, loginUsers) => (req, res, next) => {
  req.io = io;

  req.loginUsers = loginUsers;
  next();
};
