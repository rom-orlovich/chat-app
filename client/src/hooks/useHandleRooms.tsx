import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { getEventCode } from "src/lib/events";
import useAuth from "./useAuth";

function useHandleRooms(socket: Socket) {
  // Current login user data
  const { username, lastUsername } = useAuth();

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
    else leaveRoom(lastUsername.current);
  }, [username, socket]);
}

export default useHandleRooms;
