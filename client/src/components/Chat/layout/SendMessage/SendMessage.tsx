import React from "react";

import useForm from "../../../../hooks/useForm";

import InputLabel from "../../../Inputs/InputLabel/InputLabel";
import useAuth from "../../../../hooks/useAuth";
import useAutoSizeTextArea from "../../../../hooks/useAutosizeTextArea";
import { createNewMessageFun } from "../../utils";

const sendMessageStyle = {
  input: "overflow-hidden text-base",
};
function SendMessage() {
  const chatForm = useForm({ message: "" });
  const { message: messageValue } = chatForm.formValues;
  const { username } = useAuth();
  const ref = useAutoSizeTextArea(messageValue);

  // Generate create new message function.
  const createNewMessage = createNewMessageFun(messageValue.trim(), username);

  // Submit and send new message.
  const handleChatSubmit = chatForm.onSubmit(createNewMessage);
  return (
    <div>
      <form onSubmit={handleChatSubmit}>
        <InputLabel
          textAreaProps={{
            onKeyDown: (e) => {
              if (e.key === "Enter" && e.shiftKey) return;
              if (e.key === "Enter") createNewMessage();
            },
            ref,
            id: "message",
            rows: 1,
            className: sendMessageStyle.input,
            onChange: chatForm.onChange,
            value: chatForm.formValues.message,
            placeholder: "Your message...",
          }}
        />

        <button className="bg-green-400" type="submit">
          send message
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
