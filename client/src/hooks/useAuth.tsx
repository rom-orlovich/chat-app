import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { getAppRoutes } from "../lib/appRoutes";

function useAuth() {
  const { session, setSession } = useSessionContext();

  const navigate = useNavigate();
  const handleLogin = (name: string) => {
    setSession(name);
    navigate(getAppRoutes("CHAT"));
  };
  const handleLogout = () => {
    navigate(getAppRoutes("HOME"));
  };
  return {
    username: session,
    handleLogin,
    handleLogout,
    setUsername: setSession,
  };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;
