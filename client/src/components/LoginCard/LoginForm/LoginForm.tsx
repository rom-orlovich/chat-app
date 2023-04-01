import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

import useAuth from "src/hooks/useAuth";
import useForm from "src/hooks/useForm";
import LoginDetails from "./LoginDetails/LoginDetails";

const formStyle = {
  form: "flex flex-col justify-around items-center min-h-[15rem] w-[80%] gap-4",

  button:
    "card button-custom bg-loginButton-400 hover:bg-loginButton-500 w-full text-white text-lg flex justify-center gap-4 items-center",

  messageError: "text-errorMessage ",
};

function LoginForm() {
  const joinChatForm = useForm({ username: "" });
  const { username } = joinChatForm.formValues;
  const { handleLogin, error } = useAuth();
  const handleJoinChatSubmit = joinChatForm.onSubmit(() =>
    handleLogin(username)
  );

  // Check if username is not empty and there isn't any error with error
  const isError = !username && error;
  return (
    <form onSubmit={handleJoinChatSubmit} className={formStyle.form}>
      <LoginDetails {...joinChatForm} />

      <button className={formStyle.button} type="submit">
        <span> Join Chat </span> <BsFillChatDotsFill />
      </button>

      {isError && <p className={formStyle.messageError}>*{error}</p>}
    </form>
  );
}

export default LoginForm;
