import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { serverURL } from "src/lib/endpoints";

/**
 * Initializes socket connection.
 */
function useSocket() {
  const [socket, setSocket] = useState<Socket>(io);
  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);
  }, []);
  return socket;
}

export default useSocket;
