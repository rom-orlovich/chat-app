import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState<Socket>(io);
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_SRL || "");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return socket;
}

export default useSocket;
