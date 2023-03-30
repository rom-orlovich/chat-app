import React from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "../../components/Inputs/InputLabel/InputLabel";
import { useSessionContext } from "../../context/SessionContext";
import useForm from "../../hooks/useForm";
import { getAppRoutes } from "../../lib/appRoutes";

function HomePage() {
  const joinChatForm = useForm({ name: "" });
  const navigate = useNavigate();
  const { session, setSession } = useSessionContext();
  const handleJoinChatSubmit = joinChatForm.onSubmit(async () => {
    setSession(joinChatForm.formValues.name);
    navigate(getAppRoutes("CHAT"));
  });
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

export default HomePage;
