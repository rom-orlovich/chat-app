import { RequestHandler } from "express";
import { getActionCode } from "../../lib/actionsCodes";

const getUsername = (username: string, loginUsers: Map<string, string>) =>
  [...loginUsers.values()].includes(username);

export const loginUser: RequestHandler = (req, res) => {
  const { username } = req.body;

  // Check if the username is valid.
  if (!username.trim())
    return res.status(400).send(getActionCode("USERNAME_NOT_VALID"));
  console.log("login", req.loginUsers);
  // Check if user has already login.
  if (getUsername(username, req.loginUsers))
    return res.status(400).send(getActionCode("USERNAME_EXIST"));

  return res.status(201).send(String(getActionCode("USER_LOGIN")));
};
export const logoutUser: RequestHandler = (req, res) => {
  const username = String(req.query.username);
  console.log(username);
  console.log("logout", req.loginUsers);
  // Check if user hasn't already login.
  if (!getUsername(username, req.loginUsers))
    return res.status(400).send(getActionCode("USERNAME_NOT_EXIST"));

  return res.status(200).send(getActionCode("USER_LOGOUT"));
};
