import React from "react";

import InputLabel from "../../components/Inputs/InputLabel/InputLabel";

import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

function HomePage() {
  const joinChatForm = useForm({ name: "" });

  const { handleLogin, reason } = useAuth();
  const handleJoinChatSubmit = joinChatForm.onSubmit(() =>
    handleLogin(joinChatForm.formValues.name)
  );
  return (
    <div className="w-[100vw] h-[100vh] bg-white-500">
      <form onSubmit={handleJoinChatSubmit} className="">
        <InputLabel
          inputProps={{
            id: "name",
            onChange: joinChatForm.onChange,
            value: joinChatForm.formValues.name,
            placeholder: "name",
          }}
        />
        <button type="submit"> enter chat</button>
        {reason && <p>{reason}</p>}
      </form>
    </div>
  );
}

export default HomePage;
