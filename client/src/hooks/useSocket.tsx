import React, { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'

function useSocket() {
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);
    
        return () => {
          newSocket.disconnect();
        };
      }, []);
    return socket

}

export default useSocket