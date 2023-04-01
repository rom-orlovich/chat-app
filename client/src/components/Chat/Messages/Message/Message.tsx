import React, { PropsWithChildren } from "react";
import { MessageProps } from "../../../../types/messages.types";
import {
  classIsOn,
  classNameGenerator,
  getLocalTimeDate,
} from "../../../../lib/utils";

const messageStyle = {
  message:
    "card min-w-[14rem] max-w-fit max-h-fit font-Roboto min-h-[2rem] flex flex-col p-2",
  messageBg: "bg-white self-end",
  myMessageBg: "bg-myMsgBlock",
  systemBg:
    "bg-sysMsgBlock !min-h-[2rem] xs:!flex-row gap-2 justify-center max-w-[14rem] items-center self-center",
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
  // Check current sender message.
  const isMyMessage = username === myUsername;
  const isSystem = username === "system";

  const createdAtDate = getLocalTimeDate(new Date(createdAt));

  // Check the current message's style.
  const styleByMessageUsername = classIsOn(
    isSystem,
    messageStyle.systemBg, // System messages.
    curStyleMessage(isMyMessage) // Users message.
  );

  // The message item component.
  const MessageItem = ({ children }: PropsWithChildren) => (
    <li
      className={classNameGenerator(
        messageStyle.message,
        styleByMessageUsername
      )}
    >
      {children}
    </li>
  );

  // Message content.
  const messageContent = (
    <>
      {!isSystem && <span className={messageStyle.username}>{username} </span>}
      <span className={messageStyle.content}> {content} </span>
      <span className={messageStyle.time}> {createdAtDate} </span>
    </>
  );

  return <MessageItem>{messageContent}</MessageItem>;
}

export default Message;
