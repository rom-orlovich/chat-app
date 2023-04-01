import { ExtractKey } from "src/types/types";
import { MessageSent } from "src/types/messages.types";
import { ActionCodeKey, getActionMessage } from "../actionsCodes";

export const createSysMessageObj = (
  action: ExtractKey<ActionCodeKey, "USER_LOGIN" | "USER_LOGOUT">,
  username: string
) => {
  // Insert message to db.
  const curDate = new Date();

  const actionMessage = getActionMessage(action) as unknown as (
    username: string
  ) => string;

  const message: MessageSent = {
    username: "system",
    content: actionMessage(username),
    createdAt: curDate,
  };
  return message;
};
