import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import { useSessionContext } from "../../context/SessionContext";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import { getEventName } from "../../lib/events";
import { Message } from "../../lib/types/messages.types";

function ChatPage() {
  const data = useLoaderData() as Message[];
  console.log(data);
  const socket = useSocket();
  // const { session } = useSessionContext();
  const { session, handleLogout } = useAuth();
  useEffect(() => {
    if (session) socket.emit(getEventName("JOIN_CHAT"), session);
    else socket.emit(getEventName("LEAVE_CHAT"), session);
  }, [socket]);
  return (
    <div>
      <button onClick={handleLogout}>Logout </button>
      <Chat socket={socket} curMessages={data} />
    </div>
  );
}

export default ChatPage;
