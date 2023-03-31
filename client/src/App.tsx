import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

import InputLabel from "./components/Inputs/InputLabel/InputLabel";
import useForm from "./hooks/useForm";

import { getEventName } from "./lib/events";

// const socket = connect("http://localhost:5000");

function App() {
  const joinChatForm = useForm({ name: "" });

  const handleJoinChatSubmit = joinChatForm.onSubmit(async () => {});

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
      </form>
    </div>
  );
}

export default App;
