import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useSessionContext } from "../../context/SessionContext";
import useForm from "../../hooks/useForm";

import { getEventName } from "../../lib/events";
import { Message, MessageSent } from "../../lib/types/messages.types";
import { OmitKey, PickKey } from "../../lib/types/types";

import InputLabel from "../Inputs/InputLabel/InputLabel";

function Chat({
  socket,
  curMessages,
}: {
  socket: Socket;
  curMessages: Message[];
}) {
  const chatForm = useForm({ message: "" });
  const state = useSessionContext();
  const [messages, setMessages] = useState<Message[]>(curMessages);

  // Submit and send new message.
  const handleChatSubmit = chatForm.onSubmit(async () => {
    const message: MessageSent = {
      content: chatForm.formValues.message,
      senderName: state.session,
      createdAt: new Date(),
    };
    socket.emit(getEventName("SEND_MESSAGE"), message);
  });

  useEffect(() => {
    const handleSetNewMessage = (data: any) =>
      setMessages((pre) => [...pre, data]);
    socket.on(getEventName("BROADCAST_MESSAGES"), handleSetNewMessage);
    return () => {
      socket.off(getEventName("BROADCAST_MESSAGES"), handleSetNewMessage);
    };
  }, [socket]);

  return (
    <>
      <form onSubmit={handleChatSubmit}>
        <InputLabel
          textAreaProps={{
            id: "message",
            onChange: chatForm.onChange,
            value: chatForm.formValues.message,
            placeholder: "message",
          }}
        />

        <button className="bg-green-400" type="submit">
          send message
        </button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.messageID} className="flex gap-2">
            <span>{message.senderName} </span>
            <span> {message.content} </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Chat;
