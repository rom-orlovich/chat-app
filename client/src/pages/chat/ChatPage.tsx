import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import LoginUsers from "../../components/LoginUsers.ts/LoginUsers";

import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import { getAppRoutes } from "../../lib/appRoutes";
import { getEventName } from "../../lib/events";
import { Message } from "../../lib/types/messages.types";

function ChatPage() {
  const data = useLoaderData() as Message[];
  console.log(data);
  const socket = useSocket();
  const n = useNavigate();
  const { username, handleLogout, last } = useAuth();

  useEffect(() => {
    if (username) socket.emit(getEventName("JOIN_CHAT"), username);
    else {
      socket.emit(getEventName("LEAVE_CHAT"), last.current);
      n(getAppRoutes("HOME"));
    }
  }, [socket, username]);

  return (
    <div>
      <button onClick={handleLogout}> Logout </button>
      <Chat socket={socket} curMessages={data} />
      <LoginUsers socket={socket} />
    </div>
  );
}

export default ChatPage;
