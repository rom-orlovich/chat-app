import { getDateFromStr } from "src/lib/utils";

import { createMessage } from "../../lib/api/messagesAPI";
import { MessageProps, MessageSent } from "../../types/messages.types";

/**
 * Create a function the create a message object to send to an message api and reset the chat's text field value.
 */
export const createNewMessageFun =
  (messageValue: string, username: string, resetMessage: () => void) =>
  async () => {
    if (!messageValue) return;
    const message: MessageSent = {
      content: messageValue,
      username,
      createdAt: new Date(),
    };
    await createMessage(message);
    resetMessage();
  };

/**
 * Check if the two different following dates are in different in their dates' days.
 */
export const checkIfTwoDatesAreInDifferentDays = (
  messages: MessageProps[],
  curIndex: number
) => {
  // Check if the current index is small than the message length array.
  if (!(curIndex < messages.length - 1)) return false;
  const curMessage = messages[curIndex];
  const nextMessage = messages[curIndex + 1];
  const curDateTime = getDateFromStr(curMessage.createdAt).getDate();
  const nextDateTime = getDateFromStr(nextMessage.createdAt).getDate();

  // Check if the current day and the next day are in different days.
  return curDateTime !== nextDateTime;
};
