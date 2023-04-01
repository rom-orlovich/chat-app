import axios from "axios";
import { ActionCodeKey, getActionMessage } from "../../lib/actionsCodes";
import { MessageToDB } from "../../mongoDB/handlers/messages";
import { GLOBAL_CHAT_ID } from "./handlers";
import {
  SERVER_URL_API,
  createURL,
  getAppEndpoints,
} from "../../lib/endpoints";

export const createSysMessageObj = (
  action: ActionCodeKey,
  username: string
) => {
  // Insert message to db.
  const curDate = new Date();
  const messageID = String(curDate.getTime());
  const message: MessageToDB = {
    messageID,
    chatID: GLOBAL_CHAT_ID,
    username: "system",
    content: getActionMessage(action)(username),
    createdAt: curDate,
  };
  return message;
};

export const createMessageByUsingAPI = async (message: MessageToDB) => {
  const url = createURL(SERVER_URL_API, getAppEndpoints("MESSAGES"));
  try {
    const res = await axios.post(url, message);
  } catch (error) {
    console.log(error);
  }
};
