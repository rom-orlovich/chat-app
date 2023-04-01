import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { getAppRoutes } from "src/lib/appRoutes";
import { useNavigate } from "react-router-dom";

import { createMessage } from "src/lib/api/messagesAPI";
import { createSysMessageObj } from "src/lib/api/utils";
import { getEventName } from "src/lib/events";
import useAuth from "./useAuth";

function useHandleRooms(socket: Socket) {
  // Current login user data
  const { username, last } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const joinRoom = async () => {
      // Emit socket event of join chat.
      socket.emit(getEventName("JOIN_CHAT"), username);
      // Create a message that the user is login.
      await createMessage(createSysMessageObj("USER_LOGIN", username));
      // Navigate
      return navigate(getAppRoutes("CHAT"));
    };
    const leaveRoom = async () => {
      // Emit socket event of leave chat.
      socket.emit(getEventName("LEAVE_CHAT"), last.current);
      // Create a message that the user is logout.
      await createMessage(createSysMessageObj("USER_LOGOUT", last.current));
      // Create a message that the user is logout.
      navigate(getAppRoutes("HOME"));
    };

    // If there is valid login username emit join chat socket event.
    if (username) joinRoom();
    else leaveRoom();

    return () => {
      leaveRoom();
    };
  }, [socket, username]);
}

export default useHandleRooms;
