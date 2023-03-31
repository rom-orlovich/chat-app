import React from "react";
import { MessageProps } from "../../../../types/messages.types";
import {
  classIsOn,
  classNameGenerator,
  getLocalTimeDate,
} from "../../../../lib/utils";

const messageStyle = {
  message:
    "card min-w-[20%] max-w-[20vw] max-h-fit font-Roboto min-h-[2rem] flex flex-col p-2",
  messageBg: "bg-white self-end",
  myMessageBg: "bg-myMsgBlock",
  systemBg:
    "bg-sysMsgBlock !min-h-[2rem] !flex-row gap-2 justify-center max-w-fit items-center self-center",
  username: "text-base text-username px-1",
  content: "px-2",
  time: "text-sm self-end text-time  px-1",
};
const curStyleMessage = (condition: boolean) =>
  classIsOn(condition, messageStyle.myMessageBg, messageStyle.messageBg);
function Message({
  username,
  content,
  createdAt,
  myUsername,
}: MessageProps & { myUsername: string }) {
  const isMyMessage = username === myUsername;
  const isSystem = username === "system";
  const styleByMessageUsername = classIsOn(
    isSystem,
    messageStyle.systemBg, // System messages.
    curStyleMessage(isMyMessage) // Users message.
  );
  const createdAtDate = getLocalTimeDate(new Date(createdAt));
  return (
    <li
      className={classNameGenerator(
        messageStyle.message,
        styleByMessageUsername
      )}
    >
      {!isSystem && <span className={messageStyle.username}>{username} </span>}
      <span className={messageStyle.content}> {content} </span>
      <span className={messageStyle.time}> {createdAtDate} </span>
    </li>
  );
}

export default Message;
