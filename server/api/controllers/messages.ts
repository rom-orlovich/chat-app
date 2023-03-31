import { RequestHandler } from "express";
import { getActionCode } from "../../src/lib/actionsCodes";
import { getEventName } from "../../src/lib/events";
import {
  createMessageInDB,
  getMessagesFromDB,
} from "../../src/mongoDB/handlers/messages";
import { GLOBAL_CHAT_ID } from "../../src/socket/lib/handlers";

export const getMessages: RequestHandler = async (req, res) => {
  const messages = await getMessagesFromDB();
  return res.send(messages);
};

export const createMessage: RequestHandler = async (req, res) => {
  const messageData = req.body;
  const { io } = req;

  const message = {
    ...messageData,
    chatID: GLOBAL_CHAT_ID,
    messageID: String(new Date(messageData?.createdAt).getTime()),
  };

  const result = await createMessageInDB(message);
  if (!result)
    return res.status(400).send(getActionCode("MESSAGE_NOT_CREATED"));

  io.to(GLOBAL_CHAT_ID).emit(getEventName("BROADCAST_NEW_MESSAGE"), message);
  return res.status(201).send(getActionCode("MESSAGE_CREATED"));
};
