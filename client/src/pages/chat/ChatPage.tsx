import { useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "src/components/Sidebar.ts/Sidebar";
import { getEventCode } from "src/lib/events";
import { useEffect } from "react";
import { getAppRoutes } from "src/lib/appRoutes";
import Chat from "../../components/Chat/Chat";

import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

import { MessageProps } from "../../types/messages.types";

const chatPageStyle = {
  pageContainer:
    "w-[100vw] h-[100vh] max-h-[100vh] bg-chatBackground overflow-hidden",
};

function ChatPage() {
  // Load the last messages data from the server.
  const data = useLoaderData() as MessageProps[];

  // Connect to socket.
  const socket = useSocket();
  const navigate = useNavigate();

  // Current login user data
  const { username, lastUsername } = useAuth();

  useEffect(() => {
    // If there is valid login username emit join chat socket event.
    if (username) socket.emit(getEventCode("JOIN_CHAT"), username);
    else {
      // Otherwise navigate to home page.
      socket.emit(getEventCode("LEAVE_CHAT"), lastUsername.current);
      navigate(getAppRoutes("HOME"));
    }
    return () => {
      socket.emit(getEventCode("LEAVE_CHAT"), username);
    };
  }, [socket, username]);

  return (
    <section className={chatPageStyle.pageContainer}>
      <Chat socket={socket} curMessages={data} />
      <Sidebar socket={socket} />
    </section>
  );
}

export default ChatPage;
