import { RequestHandler } from "express";
import { getActionCode } from "../../lib/actionsCodes";

/**
Get the username from the loginUsers map.
**/
const getUsername = (username: string, loginUsers: Map<string, string>) =>
  [...loginUsers.values()].includes(username);

/**
 * Controller for GET - /api/users/login
 **/
export const loginUser: RequestHandler = (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string")
    return res.status(400).send(getActionCode("USERNAME_NOT_VALID"));

  // Check if the username is valid.
  if (!username.trim())
    return res.status(400).send(getActionCode("USERNAME_NOT_VALID"));

  // Check if user has already login.
  if (getUsername(username, req.loginUsers))
    return res.status(403).send(getActionCode("USERNAME_EXIST"));

  // Response a proper message.
  return res.status(201).send(String(getActionCode("USER_LOGIN")));
};
