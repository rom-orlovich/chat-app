import React from "react";
import { HiUser } from "react-icons/hi";
import SidebarItemContent from "../SidebarItemContent";

function LoginUser({ username, isON }: { username: string; isON: boolean }) {
  return (
    <li>
      <SidebarItemContent isOn={isON} text={username} icon={<HiUser />} />
    </li>
  );
}

export default LoginUser;
