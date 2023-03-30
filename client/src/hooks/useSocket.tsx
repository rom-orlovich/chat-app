import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState<Socket>(io);
  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
    const newSocket = io(process.env.REACT_APP_SERVER_URL || "");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return socket;
}

export default useSocket;
