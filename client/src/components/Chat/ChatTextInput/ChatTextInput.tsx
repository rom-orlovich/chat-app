import React, { KeyboardEventHandler } from "react";

import { BsSend } from "react-icons/bs";

import { Socket } from "socket.io-client";
import { getEventCode } from "src/lib/events";
import { useDebouncedCallback } from "use-debounce";
import useForm from "../../../hooks/useForm";

import InputLabel from "../../Inputs/InputLabel/InputLabel";
import useAuth from "../../../hooks/useAuth";
import useAutoSizeTextArea from "../../../hooks/useAutoSizeTextArea";
import { createNewMessageFun } from "../utils";

const chatTextInputStyle = {
  container: "flex flex-col ",
  form: "min-w-[90%]  self-center",
  inputContainer: "",
  label: "block",
  input: "overflow-hidden text-base mb-2",
  iconButton:
    "absolute right-[2%] top-[20%] focus:bg-[#f0eaeaf0] flex justify-center items-center w-6 h-6 hover:bg-[#fffafaf0]",
  icon: "text-[#2e2d2df0] rounded-md",
};
function ChatTextInput({ socket }: { socket: Socket }) {
  const chatForm = useForm({ message: "" });
  const { message: messageValue } = chatForm.formValues;

  const { username } = useAuth();

  // Get the ref for textArea height resizing.
  const ref = useAutoSizeTextArea(messageValue);

  // Clean the chat's text input.
  const resetMessage = () => chatForm.setFormValues({ message: "" });

  // Generate create new message function.
  const createNewMessage = createNewMessageFun(
    messageValue.trim(),
    username,
    resetMessage
  );

  // Submit and send new message.
  const handleChatSubmit = chatForm.onSubmit(createNewMessage);

  const handleTyping = useDebouncedCallback(() => {
    // Broadcast typing event for all the users.
    socket.emit(getEventCode("BROADCAST_TYPING"), username);
  }, 200);

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    handleTyping();
    // For new line.
    if (e.key === "Enter" && e.shiftKey) return;

    // For sending new message.
    if (e.key === "Enter") createNewMessage();
  };

  return (
    <div className={chatTextInputStyle.container}>
      <form className={chatTextInputStyle.form} onSubmit={handleChatSubmit}>
        <InputLabel
          wrapperInputLabel={{ className: "block" }}
          labelProps={{
            className: chatTextInputStyle.label,
          }}
          textAreaProps={{
            onKeyDown: handleKeyDown,
            ref,
            id: "message",
            rows: 1,
            className: chatTextInputStyle.input,
            onChange: chatForm.onChange,
            value: chatForm.formValues.message,
            placeholder: "Your message...",
          }}
          IconButtonProps={{
            Icon: <BsSend color="#2e2d2df0" />,
            buttonProps: {
              type: "submit",
              className: chatTextInputStyle.iconButton,
            },
          }}
        />
      </form>
    </div>
  );
}

export default ChatTextInput;
