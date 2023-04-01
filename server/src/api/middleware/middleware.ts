import { RequestHandler } from "express";
import { Io } from "../../types/express";

/**
 * Extends the express's request object with io instance and loginUsers map.
 */
export const getRequestExtendMiddleware: (
  io: Io,
  loginUsers: Map<string, string>
) => RequestHandler = (io, loginUsers) => (req, res, next) => {
  req.io = io;
  req.loginUsers = loginUsers;
  next();
};
