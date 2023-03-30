import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useSessionContext } from "../../context/SessionContext";
import useForm from "../../hooks/useForm";
import useSocket from "../../hooks/useSocket";
import { getEventName } from "../../lib/events";

import InputLabel from "../Inputs/InputLabel/InputLabel";

export interface Message {
  messageID: string;
  // userID:string,
  name: string;
  content: string;
  createdAt: string;
}
function Chat({ socket }: { socket: Socket }) {
  const chatForm = useForm({ message: "" });
  const state = useSessionContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const handleChatSubmit = chatForm.onSubmit(async () => {
    socket.emit(getEventName("SEND_MESSAGE"), {
      content: chatForm.formValues.message,
      name: "",
      createdAt: new Date(),
    });
  });

  useEffect(() => {
    const handle = (data: any) => setMessages((pre) => [...pre, data]);

    socket.on(getEventName("BROADCAST_MESSAGES"), handle);

    return () => {
      socket.off(getEventName("BROADCAST_MESSAGES"), handle);
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

        <button type="submit"> send message</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.messageID}>{message.content}</li>
        ))}
      </ul>
    </>
  );
}

export default Chat;
