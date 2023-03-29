import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

import InputLabel from "./components/Inputs/InputLabel/InputLabel";
import useForm from "./hooks/useForm";
import useSocket from "./hooks/useSocket";

import { getEventName } from "./lib/events";

export interface Message {
  messageID: string;
  // userID:string,
  name: string;
  content: string;
  createdAt: string;
}
const socket = connect("http://localhost:5000");

function App() {
  // const socket = useSocket();

  const joinChatForm = useForm({ name: "" });
  const chatForm = useForm({ message: "" });

  const [messages, setMessages] = useState<Message[]>([]);

  const handleJoinChatSubmit = joinChatForm.onSubmit(async () => {
    if (socket)
      socket.emit(getEventName("JOIN_CHAT"), {
        name: joinChatForm.formValues.name,
      });
  });

  const handleChatSubmit = chatForm.onSubmit(async () => {
    if (socket)
      socket.emit(getEventName("SEND_MESSAGE"), {
        content: chatForm.formValues.message,
        name: joinChatForm.formValues.name,
        createdAt: new Date(),
      });
  });

  useEffect(() => {
    if (!socket) return;

    const handle = (data: any) => {
      console.log(data);
      return setMessages((pre) => [...pre, data]);
    };

    socket.on(getEventName("BROADCAST_MESSAGES"), handle);

    return () => {
      socket.off(getEventName("BROADCAST_MESSAGES"), handle);
    };
  }, [socket]);

  return (
    <div className="w-[100vw] h-[100vh] bg-white-500">
      <form onSubmit={handleJoinChatSubmit} className="">
        <InputLabel
          inputProps={{
            id: "name",
            onChange: joinChatForm.onChange,
            value: joinChatForm.formValues.name,
            placeholder: "name",
          }}
        />
        <button type="submit"> enter chat</button>
      </form>

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
    </div>
  );
}

export default App;
