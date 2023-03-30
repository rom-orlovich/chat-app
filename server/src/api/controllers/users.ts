import { RequestHandler } from "express";
import { getActionCode } from "../../lib/actionsCodes";
import { getEventName } from "../../lib/events";

export const loginUser: RequestHandler = (req, res) => {
  const username = req.body;

  // Check if user has already login.
  if (req.loginUsers.has(username))
    return res.status(400).send(getActionCode("USERNAME_EXIST"));

  const { loginUsers, io } = req;

  // Add current username to users login set.
  loginUsers.add(username);

  // Emit event of join chat.
  console.log(getEventName("JOIN_CHAT"));

  io.emit(getEventName("JOIN_CHAT"), username);

  return res.status(201).send(String(getActionCode("USER_LOGIN")));
};
export const logoutUser: RequestHandler = (req, res) => {
  const username = String(req.query.username);
  console.log(req.loginUsers);
  // Check if user hasn't already login.
  if (!req.loginUsers.has(username))
    return res.status(400).send(getActionCode("USERNAME_NOT_EXIST"));

  const { loginUsers, io } = req;

  // Delete current username to users login set.
  loginUsers.delete(username);

  // Emit event of join chat.
  io.emit(getEventName("LEAVE_CHAT"), username);

  return res.status(201).send(getActionCode("USER_LOGOUT"));
};
