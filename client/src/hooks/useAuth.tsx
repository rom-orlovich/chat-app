import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { getAppRoutes } from "../lib/appRoutes";

function useAuth() {
  const { session: username, setSession } = useSessionContext();

  const navigate = useNavigate();
  const handleLogin = (name: string) => {
    setSession(name);
    navigate(getAppRoutes("CHAT"));
  };
  const last = useRef("");
  const handleLogout = () => {
    last.current = username;
    setSession("");
    // navigate(getAppRoutes("HOME"));
  };

  return {
    username,
    handleLogin,
    handleLogout,
    setUsername: setSession,
    last,
  };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;
