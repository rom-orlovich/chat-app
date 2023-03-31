import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { getEventName } from "../../lib/events";
import { Message } from "../../types/messages.types";

import SendMessage from "./layout/SendMessage/SendMessage";
import Messages from "./layout/Messages/Messages";

const chatStyle = {
  container: "flex flex-col justify-between ml-60 mr-2 p-4 h-full",
  inputMsg: "overflow-hidden text-base",
};

function Chat({
  socket,
  curMessages,
}: {
  socket: Socket;
  curMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(curMessages);

  // Update the chat with real time messages.
  useEffect(() => {
    const handleSetNewMessage = (data: Message) =>
      setMessages((pre) => [...pre, data]);

    socket.on(getEventName("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);
    return () => {
      socket.off(getEventName("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);
    };
  }, [socket]);

  return (
    <section className={chatStyle.container}>
      <Messages messages={messages} />

      <SendMessage />
    </section>
  );
}

export default Chat;
