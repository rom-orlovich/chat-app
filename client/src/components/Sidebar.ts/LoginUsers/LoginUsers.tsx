import React from "react";
import Overflow from "src/components/Overflow/Overflow";
import useAuth from "src/hooks/useAuth";
import LoginUser from "./LoginUser/LoginUser";

const loginUsersStyle = {
  list: "flex flex-col gap-8 items-center mt-[4rem]",
};
interface LoginUsersProps {
  loginUsers: string[];
  isON: boolean;
}

function LoginUsers({ loginUsers, isON }: LoginUsersProps) {
  const { username: activeUser } = useAuth();
  // Put the current active login user first in the array.
  const sortedLoginUsers = loginUsers.sort((a, b) => {
    if (a === activeUser) return -1;
    if (b === activeUser) return 1;
    return 1;
  });
  return (
    <Overflow
      active={loginUsers.length > 2}
      innerElementClass="h-[95%]"
      outerElementClass="h-[90%] overflow-x-visible"
    >
      <ul className={loginUsersStyle.list}>
        {sortedLoginUsers.map((username, i) => (
          <LoginUser
            activeUser={activeUser}
            username={username}
            key={i + username}
            isON={isON}
          />
        ))}
      </ul>
    </Overflow>
  );
}

export default LoginUsers;
