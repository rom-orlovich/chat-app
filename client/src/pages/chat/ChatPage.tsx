import React, { useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import { useSessionContext } from "../../context/SessionContext";
import useSocket from "../../hooks/useSocket";
import { getEventName } from "../../lib/events";

function ChatPage() {
  const socket = useSocket();
  const { session } = useSessionContext();
  useEffect(() => {
    socket.emit(getEventName("JOIN_CHAT"), session);
  }, [socket]);
  return <div>{<Chat socket={socket} />}</div>;
}

export default ChatPage;
