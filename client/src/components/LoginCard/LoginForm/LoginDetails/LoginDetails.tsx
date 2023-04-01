import React from "react";
import InputLabel from "src/components/Inputs/InputLabel/InputLabel";
import { ReturnTypeUseForm } from "src/hooks/useForm";

const LoginDetailsStyle = {
  inputsContainer: "flex flex-col  gap-6 w-full text-lg",
  label: "w-full",
  input: "card focus:outline-none focus:border-none text-lg",
  inputDisable:
    "card disabled:bg-slate-100 disabled:cursor-not-allowed text-lg",
};
function LoginDetails({
  formValues,
  onChange,
}: ReturnTypeUseForm<{ username: string }, unknown>) {
  return (
    <div className={LoginDetailsStyle.inputsContainer}>
      <InputLabel
        labelProps={{ className: LoginDetailsStyle.label }}
        inputProps={{
          id: "username",
          className: LoginDetailsStyle.input,
          onChange,
          value: formValues.username,
          placeholder: "Your username",
        }}
      />

      <InputLabel
        labelProps={{ className: LoginDetailsStyle.label }}
        inputProps={{
          id: "chat",
          className: LoginDetailsStyle.inputDisable,
          onChange,
          value: "Global Chat",
          disabled: true,
          placeholder: "chat",
        }}
      />
    </div>
  );
}

export default LoginDetails;
