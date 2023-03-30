import React, { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import Chat from "../../components/Chat/Chat";

import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import { getEventName } from "../../lib/events";
import { Message } from "../../lib/types/messages.types";

function ChatPage() {
  const data = useLoaderData() as Message[];
  console.log(data);
  const socket = useSocket();

  const { username, handleLogout } = useAuth();

  useEffect(() => {
    if (username) socket.emit(getEventName("JOIN_CHAT"), username);
    else socket.emit(getEventName("LEAVE_CHAT"), username);
  }, [socket]);
  return (
    <div>
      <button onClick={handleLogout}> Logout </button>
      <Chat socket={socket} curMessages={data} />
    </div>
  );
}

export default ChatPage;
