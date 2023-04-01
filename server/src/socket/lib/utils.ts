import axios from "axios";
import { ActionCodeKey, getActionMessage } from "../../lib/actionsCodes";
import { MessageToDB } from "../../mongoDB/handlers/messages";

import {
  SERVER_URL_API,
  createURL,
  getAppEndpoints,
} from "../../lib/endpoints";
import { GLOBAL_CHAT_ID } from "../../lib/constants";

/**
 * Create system message object.
 **/
export const createSystemMessage = (
  action: ActionCodeKey,
  username: string,
  sender = "system"
) => {
  // Create system message object.
  const curDate = new Date();
  const messageID = String(curDate.getTime());

  const message: MessageToDB = {
    messageID,
    chatID: GLOBAL_CHAT_ID,
    username: sender,
    content: getActionMessage(action)(username),
    createdAt: curDate,
  };
  return message;
};

/**
 * Create message by the server api.
 * Request POST - /api/messages
 */
export const createMessageByUsingAPI = async (message: MessageToDB) => {
  const url = createURL(SERVER_URL_API, getAppEndpoints("MESSAGES"));
  try {
    const res = await axios.post(url, message);
  } catch (error) {
    console.log(error);
  }
};
