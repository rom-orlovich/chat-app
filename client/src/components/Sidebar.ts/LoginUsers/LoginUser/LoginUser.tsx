import React from "react";

import { FaUser } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { classIsOn, classNameGenerator } from "src/lib/utils";
import SidebarItemContent from "../../SidebarItemContent";

export const getItemStyle = (isON: boolean, activeUser: boolean) => ({
  li: classNameGenerator(
    `flex items-center gap-4 p-2 rounded-md cursor-pointer `,
    classIsOn(isON && activeUser, "bg-white", "bg-slate-200"),
    classIsOn(isON, "w-[85%]", "bg-transparent")
  ),

  icon: classNameGenerator(
    classIsOn(isON, "text-gray-400", "text-white"),
    "text-xl"
  ),
});
type LoginUserProps = {
  username: string;
  isON: boolean;
  activeUser: string;
};

function LoginUser({ username, isON, activeUser }: LoginUserProps) {
  // Default item style.
  // Check active user.
  const isActiveUser = username === activeUser;
  const itemStyle = getItemStyle(isON, isActiveUser);
  return (
    <li className={itemStyle.li}>
      <SidebarItemContent
        isOn={isON}
        text={username}
        icon={<FaUser className={itemStyle.icon} />}
        isONcontainerStyle="gap-4"
      />
      {isON && <TbPointFilled className="text-loginButton-400 text-2xl" />}
    </li>
  );
}

export default LoginUser;
