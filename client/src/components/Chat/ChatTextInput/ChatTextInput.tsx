import React, { useEffect } from "react";

import useForm from "../../../hooks/useForm";

import InputLabel from "../../Inputs/InputLabel/InputLabel";
import useAuth from "../../../hooks/useAuth";
import useAutoSizeTextArea from "../../../hooks/useAutoSizeTextArea";
import { createNewMessageFun } from "../utils";

const ChatTextInputStyle = {
  input: "overflow-hidden text-base",
};
function ChatTextInput() {
  const chatForm = useForm({ message: "" });
  const { message: messageValue } = chatForm.formValues;
  const { username } = useAuth();
  const ref = useAutoSizeTextArea(messageValue);
  const resetMessage = () => chatForm.setFormValues({ message: "" });

  // Generate create new message function.
  const createNewMessage = createNewMessageFun(
    messageValue.trim(),
    username,
    resetMessage
  );

  // Submit and send new message.
  const handleChatSubmit = chatForm.onSubmit(createNewMessage);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleChatSubmit(e);
        }}
      >
        <InputLabel
          textAreaProps={{
            onKeyDown: (e) => {
              if (e.key === "Enter" && e.shiftKey) return;
              if (e.key === "Enter") createNewMessage();
            },
            ref,
            id: "message",
            rows: 1,
            className: ChatTextInputStyle.input,
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

export default ChatTextInput;
