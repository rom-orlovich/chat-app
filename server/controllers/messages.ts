import { RequestHandler } from "express";
import { getMessagesFromDB } from "../mongoDB/handlers/messages";

export const getMessages: RequestHandler = async (req, res) => {
  const messages = await getMessagesFromDB();
  return res.json(messages);
};
