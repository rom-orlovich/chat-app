import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { BoolKey } from "src/types/types";

import { getEventName } from "../../lib/events";
import { classNameGenerator } from "../../lib/utils";

import Toggle from "../Toggle/Toggle";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

import ButtonAuth from "./ButtonAuth.tsx/ButtonAuth";
import LoginUsers from "./LoginUsers/LoginUsers";

const sideBarStyle = {
  nav: "fixed  bg-sideBar z-50 top-0 flex h-[100vh] flex-col items-center bg-nav-500 shadow-lg ",
  isOn: {
    nav: {
      true: "min-w-[14rem]",
      false: "min-w-[2rem]",
    },
  },
  hoverUser: "hover:bg-nav-600",
  "loginUsers&button-container":
    "flex h-full flex-col justify-between py-6 w-[100%]",

  icon: "text-2xl",
};
function Sidebar({ socket }: { socket: Socket }) {
  const [loginUsers, setLoginUsers] = useState<string[]>([]);

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
        const navIsOn = sideBarStyle.isOn.nav[bool];

        return (
          <section
            className={classNameGenerator(
              sideBarStyle.nav,
              navIsOn,
              "duration-500"
            )}
          >
            <HamburgerMenu {...toggleProps} />
            <div className={sideBarStyle["loginUsers&button-container"]}>
              <LoginUsers isON={isON} loginUsers={loginUsers} />
              <ButtonAuth isON={isON} />
            </div>
          </section>
        );
      }}
    </Toggle>
  );
}

export default Sidebar;
