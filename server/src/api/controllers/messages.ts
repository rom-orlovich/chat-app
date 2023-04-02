import { RequestHandler } from "express";
import { getActionCode } from "../../lib/actionsCodes";

import {
  createMessageInDB,
  getMessagesFromDB,
} from "../../mongoDB/handlers/messages";
import { GLOBAL_CHAT_ID } from "../../lib/constants";

/**
 * Controller for GET - /api/messages
 */
export const getMessages: RequestHandler = async (req, res) => {
  const messages = await getMessagesFromDB();
  return res.send(messages);
};

/**
 * Controller for POST - /api/messages
 */
export const createMessage: RequestHandler = async (req, res) => {
  const messageData = req.body;

  // Create message object.
  const message = {
    ...messageData,
    chatID: GLOBAL_CHAT_ID,
    messageID: String(new Date(messageData?.createdAt).getTime()),
  };

  // Create the message in the mongoDB.
  const result = await createMessageInDB(message);

  // Check if the message was inserted successfully.
  if (!result)
    return res.status(400).send(getActionCode("MESSAGE_NOT_CREATED"));

  // Response a proper message.
  return res.status(201).send(getActionCode("MESSAGE_CREATED"));
};
