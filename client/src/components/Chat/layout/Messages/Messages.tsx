import React from "react";

import Overflow from "../../../Overflow/Overflow";
import useScrollDown from "../../../../hooks/useScrollDown";
import Message from "./layout/Message/Message";

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
          <Message {...message} />
        ))}
      </ul>
      <div ref={lastMessage}></div>
    </Overflow>
  );
}

export default Messages;
