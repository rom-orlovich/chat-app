import { RequestHandler } from "express";
import { getActionCode } from "../../lib/actionsCodes";

export const loginUser: RequestHandler = (req, res) => {
  const { username } = req.body;

  // Check if the username is valid.
  if (!username.trim())
    return res.status(400).send(getActionCode("USERNAME_NOT_VALID"));

  // Check if user has already login.
  if (req.loginUsers.has(username))
    return res.status(400).send(getActionCode("USERNAME_EXIST"));

  return res.status(201).send(String(getActionCode("USER_LOGIN")));
};
export const logoutUser: RequestHandler = (req, res) => {
  const username = String(req.query.username);

  // Check if user hasn't already login.
  if (!req.loginUsers.has(username))
    return res.status(400).send(getActionCode("USERNAME_NOT_EXIST"));

  // const { loginUsers, io } = req;

  // Delete current username to users login set.
  // loginUsers.delete(username);

  // Emit event of join chat.
  // io.emit(getEventName("LEAVE_CHAT"), username);

  return res.status(200).send(getActionCode("USER_LOGOUT"));
};
