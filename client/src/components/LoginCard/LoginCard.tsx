import React from "react";

import LoginForm from "./LoginForm/LoginForm";

const loginCardStyle = {
  container:
    "card bg-loginCard xs:min-w-[25rem] min-w-[20rem]  min-h-[24rem] flex flex-col items-center justify-center gap-4",
  title: "text-4xl",
};

function LoginCard() {
  return (
    <div className={loginCardStyle.container}>
      <h1 className={loginCardStyle.title}>Chat App</h1>
      <LoginForm />
    </div>
  );
}

export default LoginCard;
