import { RequestHandler } from "express";
import { Io } from "../../types/express";

/**
 * Extends the express's request object with loginUsers map.
 */
export const getRequestExtendMiddleware: (
  loginUsers: Map<string, string>
) => RequestHandler = (loginUsers) => (req, res, next) => {
  req.loginUsers = loginUsers;
  next();
};
