import React, { useEffect } from "react";

import { MessageProps } from "src/types/messages.types";
import useAuth from "src/hooks/useAuth";

import Overflow from "../../Overflow/Overflow";
import useScrollDown from "../../../hooks/useScrollDown";

import Message from "./Message/Message";
import DayTag from "./DayTag/DayTag";
import { checkIfTwoDatesAreInDifferentDays } from "../utils";

const messagesStyle = {
  messages: "flex flex-col gap-4 xs:p-8 xs:px-16",
};
function Messages({ messages }: { messages: MessageProps[] }) {
  const { username } = useAuth();

  // Scroll to the last message in the chat.
  const lastMessage = useScrollDown(messages);

  return (
    <Overflow
      active={messages.length > 5}
      innerElementClass="min-h-[15rem]"
      outerElementClass="h-[90%] mb-2rem "
    >
      <ul className={messagesStyle.messages}>
        {messages.map((message, i) => {
          const areInDifferentDays = checkIfTwoDatesAreInDifferentDays(
            messages,
            i
          );
          // Tag the represent the days that the messages were sent.
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
        <div ref={lastMessage}></div>
      </ul>
    </Overflow>
  );
}

export default Messages;
