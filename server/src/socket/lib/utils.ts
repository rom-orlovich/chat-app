import { ActionCodeKey, getActionMessage } from "../../lib/actionsCodes";
import { MessageToDB } from "../../mongoDB/handlers/messages";
import { GLOBAL_CHAT_ID } from "./handlers";

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
