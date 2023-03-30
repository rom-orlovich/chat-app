import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getEventName } from "../../lib/events";

function LoginUsers({ socket }: { socket: Socket }) {
  const [loginUsers, setLoginUsers] = useState<string[]>([]);
  useEffect(() => {
    const handleSetLoginUsers = (data: any) => {
      console.log(data);
      setLoginUsers(data);
    };

    socket.on(
      getEventName("BROADCAST_CURRENT_LOGIN_USERS"),
      handleSetLoginUsers
    );
    return () => {
      socket.off(
        getEventName("BROADCAST_CURRENT_LOGIN_USERS"),
        handleSetLoginUsers
      );
    };
  }, [socket]);
  return (
    <>
      <h2> Login Users</h2>
      <ul>
        {loginUsers.map((user, i) => (
          <li key={i + user}>{user}</li>
        ))}
      </ul>
    </>
  );
}

export default LoginUsers;
