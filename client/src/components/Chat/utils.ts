import { createMessage } from "../../lib/api/messagesAPI";
import { MessageSent } from "../../types/messages.types";

export const createNewMessageFun =
  (messageValue: string, username: string) => async () => {
    if (!messageValue) return;
    const message: MessageSent = {
      content: messageValue,
      username,
      createdAt: new Date(),
    };
    const res = await createMessage(message);
    console.log(res);
  };
