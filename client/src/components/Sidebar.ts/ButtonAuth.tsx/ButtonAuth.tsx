import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "src/hooks/useAuth";
import SidebarItemContent from "../SidebarItemContent";

const buttonLogoutStyle = {
  button:
    "flex justify-center items-center gap-4 p-2 rounded-md text-white hover:bg-loginButton-500",
  loginIcon: "text-2xl text-white ",
};
function ButtonAuth({ isON }: { isON: boolean }) {
  const { handleLogout } = useAuth();
  return (
    <button className={buttonLogoutStyle.button} onClick={handleLogout}>
      <SidebarItemContent
        icon={<AiOutlineLogout className={buttonLogoutStyle.loginIcon} />}
        isOn={isON}
        text={"Logout"}
        isONcontainerStyle="justify-center"
      />
    </button>
  );
}

export default ButtonAuth;
