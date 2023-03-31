import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useAuth from "src/hooks/useAuth";
import { getEventName } from "../../lib/events";
import { classNameGenerator } from "../../lib/utils";

const loginUsersStyle = {
  nav: "fixed  bg-loginUsersBar z-50 top-0 flex h-[100vh] flex-col items-center bg-nav-500 shadow-lg ",
  isOn: {
    nav: {
      true: "min-w-[14rem]",
      false: "min-w-[2rem]",
    },
  },
  hoverLink: "hover:bg-nav-600",
  "links&button-container":
    "flex h-full flex-col justify-between py-4 w-[100%]",
  icon: "text-2xl",
};
function LoginUsers({ socket }: { socket: Socket }) {
  const [loginUsers, setLoginUsers] = useState<string[]>([]);
  const { handleLogout, username, last } = useAuth();
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
  const navIsOn = loginUsersStyle.isOn.nav.true;

  return (
    <section
      className={classNameGenerator(
        loginUsersStyle.nav,
        navIsOn,
        "duration-500"
      )}
    >
      <ul>
        {loginUsers.map((user, i) => (
          <li key={i + user}>{user}</li>
        ))}
        <button onClick={handleLogout}> Logout </button>
      </ul>
    </section>
  );
}

export default LoginUsers;
