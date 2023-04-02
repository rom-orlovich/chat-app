import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { getEventCode } from "../../lib/events";
import { MessageProps } from "../../types/messages.types";

import Messages from "./Messages/Messages";
import ChatTextInput from "./ChatTextInput/ChatTextInput";

const chatStyle = {
  container:
    "flex flex-col justify-between xs:ml-[12%] ml-[10%]  xs:p-6 p-4 pb-2 xs:max-w-[80%] h-full",
  typing: "mb-4 pl-4",
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
  const [typing, setTyping] = useState("");

  // Update the chat with real time messages.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleSetNewMessage = (data: MessageProps) =>
      setMessages((pre) => [...pre, data]);

    // Handle user typing event.
    const handleTyping = (data: string) => {
      // Clear the timeout that currently on before the new timeout.
      clearTimeout(timeout);

      // Set the typing indicator's data.
      setTyping(data);

      // Set new timeout to clean the typing indicator.
      timeout = setTimeout(() => {
        setTyping("");
      }, 500);
    };

    // Handle the broadcast of new messages.
    socket.on(getEventCode("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);

    // Handle the broadcast of user typing.
    socket.on(getEventCode("BROADCAST_TYPING"), handleTyping);

    return () => {
      // Trun off the socket's events handlers.
      socket.off(getEventCode("BROADCAST_NEW_MESSAGE"), handleSetNewMessage);
      socket.off(getEventCode("BROADCAST_TYPING"), handleTyping);
    };
  }, [socket]);

  return (
    <section className={chatStyle.container}>
      <Messages messages={messages} />
      {typing && <p className={chatStyle.typing}>{typing}</p>}
      <ChatTextInput socket={socket} />
    </section>
  );
}

export default Chat;
