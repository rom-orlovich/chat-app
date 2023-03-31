import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useAuth from "src/hooks/useAuth";
import { BoolKey } from "src/types/types";

import { getEventName } from "../../lib/events";
import { classNameGenerator } from "../../lib/utils";
import LoginUser from "./LoginUser/LoginUser";
import Toggle from "../Toggle/Toggle";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

const loginUsersStyle = {
  nav: "fixed  bg-loginUsersBar z-50 top-0 flex h-[100vh] flex-col items-center bg-nav-500 shadow-lg ",
  isOn: {
    nav: {
      true: "min-w-[14rem]",
      false: "min-w-[2rem]",
    },
  },
  hoverUser: "hover:bg-nav-600",
  "loginUsers&button-container":
    "flex h-full flex-col justify-between py-4 w-[100%]",
  loginUsers: "flex flex-col gap-4",
  icon: "text-2xl",
};
function Sidebar({ socket }: { socket: Socket }) {
  const [loginUsers, setLoginUsers] = useState<string[]>([]);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const handleSetLoginUsers = (data: string[]) => {
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
    <Toggle>
      {(toggleProps) => {
        const { isON } = toggleProps;
        const bool = String(isON) as BoolKey;
        const navIsOn = loginUsersStyle.isOn.nav[bool];
        return (
          <section
            className={classNameGenerator(
              loginUsersStyle.nav,
              navIsOn,
              "duration-500"
            )}
          >
            <HamburgerMenu {...toggleProps} />
            <div className={loginUsersStyle["loginUsers&button-container"]}>
              <ul className={loginUsersStyle.loginUsers}>
                {loginUsers.map((username, i) => (
                  <LoginUser
                    username={username}
                    key={i + username}
                    isON={isON}
                  />
                ))}
              </ul>
              <button onClick={handleLogout}> Logout </button>
            </div>
          </section>
        );
      }}
    </Toggle>
  );
}

export default Sidebar;
