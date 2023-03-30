import { GLOBAL_CHAT_ID } from "../../socket/socket";
import { getCollection } from "../utils";

export interface Message {
  messageID: string;
  chatID: string;
  username: string;
  content: string;
  createdAt: string;
}
export const getMessagesFromDB = async (chatID = GLOBAL_CHAT_ID) => {
  const messages = getCollection("messages");
  try {
    const res = await messages.find<Message>({ chatID }).toArray();
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createMessageInDB = async (message: Message) => {
  const messages = getCollection("messages");
  try {
    const res = await messages.insertOne(message);
    return res.acknowledged;
  } catch (error) {
    console.log(error);
    return false;
  }
};
