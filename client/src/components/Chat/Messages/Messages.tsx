import React from "react";

import { MessageProps } from "src/types/messages.types";
import useAuth from "src/hooks/useAuth";

import Overflow from "../../Overflow/Overflow";
import useScrollDown from "../../../hooks/useScrollDown";

import Message from "./Message/Message";
import DayTag from "./DayTag/DayTag";
import { checkIfTwoDatesAreInDifferentDays } from "../utils";

const messagesStyle = {
  messages: "flex flex-col gap-4 p-6",
};
function Messages({ messages }: { messages: MessageProps[] }) {
  const { username } = useAuth();
  const lastMessage = useScrollDown(messages);

  return (
    <Overflow
      active={messages.length > 5}
      innerElementClass="min-h-[15rem] h-fit"
      outerElementClass="h-[90%]"
    >
      <ul className={messagesStyle.messages}>
        {messages.map((message, i) => {
          const areInDifferentDays = checkIfTwoDatesAreInDifferentDays(
            messages,
            i
          );
          if (areInDifferentDays)
            return (
              <DayTag
                key={messages[i].createdAt + i}
                createdAt={message.createdAt}
              />
            );

          return (
            <Message
              key={message.messageID}
              myUsername={username}
              {...message}
            />
          );
        })}
      </ul>
      <div ref={lastMessage}></div>
    </Overflow>
  );
}

export default Messages;
