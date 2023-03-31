import React from "react";
import { Message } from "../../../../../../types/messages.types";

const messageStyle = {
  message: "",
  myMessageBg: "bg-myMsgBlock",
  messageBg: "bg-msgBlock",
};
function Message({ messageID, username, content }: Message) {
  return (
    <li key={messageID} className="flex gap-2">
      <span>{username} </span>
      <span> {content} </span>
    </li>
  );
}

export default Message;
