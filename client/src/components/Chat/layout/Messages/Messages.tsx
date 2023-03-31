import React from "react";
import { Message } from "../../../../types/messages.types";
import Overflow from "../../../Overflow/Overflow";
import useScrollDown from "../../../../hooks/useScrollDown";

const messagesStyle = {
  messages: "",
};
function Messages({ messages }: { messages: Message[] }) {
  const lastMessage = useScrollDown(messages);
  return (
    <Overflow
      active={messages.length > 5}
      innerElementClass="min-h-[15rem]"
      outerElementClass="h-[95%]"
    >
      <ul className={messagesStyle.messages}>
        {messages.map((message) => (
          <li key={message.messageID} className="flex gap-2">
            <span>{message.username} </span>
            <span> {message.content} </span>
          </li>
        ))}
      </ul>
      <div ref={lastMessage}></div>
    </Overflow>
  );
}

export default Messages;
