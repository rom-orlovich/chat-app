import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

import { getAppRoutes } from "src/lib/appRoutes";
import { useLocation, useNavigate } from "react-router-dom";

import { createMessage } from "src/lib/api/messagesAPI";
import { createSysMessageObj } from "src/lib/api/utils";
import { getEventCode } from "src/lib/events";
import useAuth from "./useAuth";

function useHandleRooms(socket: Socket) {
  // Current login user data
  const { username, last } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const once = useRef(true);

  useEffect(() => {
    const joinRoom = async () => {
      // Emit socket event of join chat.
      socket.emit(getEventCode("JOIN_CHAT"), username);
    };

    const leaveRoom = async (username: string) => {
      // Emit socket event of leave chat.
      socket.emit(getEventCode("LEAVE_CHAT"), username);
    };

    // If there is valid login username emit join chat socket event.
    if (username) joinRoom();
    else leaveRoom(last.current);
  }, [username, socket]);
}

export default useHandleRooms;
