import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { getEventName } from "../../lib/events";
import { MessageProps } from "../../types/messages.types";

import Messages from "./Messages/Messages";
import ChatTextInput from "./ChatTextInput/ChatTextInput";

const chatStyle = {
  container: "flex flex-col justify-between ml-[12rem] p-6 max-w-[75%] h-full",
  inputMsg: "overflow-hidden text-base",
};

function Chat({
  socket,
  curMessages,
}: {
  socket: Socket;
  curMessages: MessageProps[];
}) {
  const [messages, setMessages] = useState<MessageProps[]>(curMessages);

  // Update the chat with real time messages.
  useEffect(() => {
    const handleSetNewMessage = (data: MessageProps) =>
      setMessages((pre) => [...pre, data]);

    socket.on(getEventName("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);
    return () => {
      socket.off(getEventName("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);
    };
  }, [socket]);

  return (
    <section className={chatStyle.container}>
      <Messages messages={messages} />

      <ChatTextInput />
    </section>
  );
}

export default Chat;
