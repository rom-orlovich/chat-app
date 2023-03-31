import React from "react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import InputLabel from "../Inputs/InputLabel/InputLabel";

const loginCardStyle = {
  container:
    "card bg-loginCard min-w-[25rem] min-h-[20rem] flex flex-col items-center justify-center",
  title: "text-2xl",
  form: "flex flex-col justify-around items-center min-h-[15rem] w-[80%] gap-4",
  inputsContainer: "flex flex-col  gap-6 w-full text-lg",
  label: "w-full",
  input: "card focus:outline-none focus:border-none",
  button:
    "card button-custom bg-loginButton-400 hover:bg-loginButton-500 w-full text-white text-lg",
  inputDisable: "card disabled:bg-slate-100 disabled:cursor-not-allowed",
  messageError: "text-errorMessage",
};

function LoginCard() {
  const joinChatForm = useForm({ username: "" });

  const { handleLogin, reason } = useAuth();
  const handleJoinChatSubmit = joinChatForm.onSubmit(() =>
    handleLogin(joinChatForm.formValues.username)
  );
  return (
    <div className={loginCardStyle.container}>
      <h1 className={loginCardStyle.title}>Chat App</h1>
      <form onSubmit={handleJoinChatSubmit} className={loginCardStyle.form}>
        <div className={loginCardStyle.inputsContainer}>
          <InputLabel
            labelProps={{ className: loginCardStyle.label }}
            inputProps={{
              id: "username",
              className: loginCardStyle.input,
              onChange: joinChatForm.onChange,
              value: joinChatForm.formValues.username,
              placeholder: "username",
            }}
          />

          <InputLabel
            labelProps={{ className: loginCardStyle.label }}
            inputProps={{
              id: "chat",
              className: loginCardStyle.inputDisable,
              onChange: joinChatForm.onChange,
              value: "Global Chat",
              disabled: true,
              placeholder: "chat",
            }}
          />
        </div>
        <button className={loginCardStyle.button} type="submit">
          Join Chat
        </button>

        {reason && <p className={loginCardStyle.errorMessage}>*{reason}</p>}
      </form>
    </div>
  );
}

export default LoginCard;
