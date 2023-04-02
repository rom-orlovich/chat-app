import { GLOBAL_CHAT_ID } from "../../lib/constants";
import { OmitKey, PickKey } from "../../types/types";
import { getCollection } from "../utils";

export interface MessageFromDB {
  messageID: string;
  chatID: string;
  username: string;
  content: string;
  createdAt: string;
}

export type MessageToDB = OmitKey<MessageFromDB, "createdAt"> & {
  createdAt: Date;
};

export type MessageEmitted = PickKey<
  MessageFromDB,
  "content" | "username" | "messageID"
> & {
  createdAt: Date;
};

export const getMessagesFromDB = async (chatID = GLOBAL_CHAT_ID) => {
  const messages = getCollection("messages");
  try {
    const res = await messages.find<MessageFromDB>({ chatID }).toArray();
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createMessageInDB = async (message: MessageToDB) => {
  const messages = getCollection("messages");
  try {
    const res = await messages.insertOne(message);
    return res.acknowledged;
  } catch (error) {
    console.log(error);
    return false;
  }
};
