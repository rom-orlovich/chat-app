import axios from "axios";
import { ActionCodeKey, getActionMessage } from "../../lib/actionsCodes";
import { MessageEmitted, MessageToDB } from "../../mongoDB/handlers/messages";

import { createURL, getAppEndpoints } from "../../lib/endpoints";
import { GLOBAL_CHAT_ID, SERVER_URL_API } from "../../lib/constants";

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
export const createMessageByUsingAPI = async (message: MessageEmitted) => {
  const url = createURL(SERVER_URL_API, getAppEndpoints("MESSAGES"));
  try {
    await axios.post(url, message);
  } catch (error) {
    console.log(error);
  }
};
