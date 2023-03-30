import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { getAppRoutes } from "../lib/appRoutes";

function useAuth() {
  const { session, setSession } = useSessionContext();
  const navigate = useNavigate();
  const handleLogin = () => {
    setSession(session);
    navigate(getAppRoutes("CHAT"));
  };
  const handleLogout = () => {
    setSession("");
    navigate(getAppRoutes("HOME"));
  };
  return { session, handleLogin, handleLogout, setSession };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;
