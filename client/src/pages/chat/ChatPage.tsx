import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import { useSessionContext } from "../../context/SessionContext";
import useSocket from "../../hooks/useSocket";
import { getEventName } from "../../lib/events";
import { Message } from "../../lib/types/messages.types";

function ChatPage() {
  const data = useLoaderData() as Message[];
  console.log(data);
  const socket = useSocket();
  const { session } = useSessionContext();
  useEffect(() => {
    socket.emit(getEventName("JOIN_CHAT"), session);
  }, [socket]);
  return <div>{<Chat socket={socket} />}</div>;
}

export default ChatPage;
