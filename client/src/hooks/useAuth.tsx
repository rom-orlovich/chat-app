import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import {
  ActionCodeValue,
  getActionCode,
  getActionResponse,
} from "../lib/actionsCodes";
import { login, logout } from "../lib/api/usersAPI";
import { getAppRoutes } from "../lib/appRoutes";

function useAuth() {
  const { session: username, setSession } = useSessionContext();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  // const handleLogin = (name: string) => {
  //   setSession(name);
  //   navigate(getAppRoutes("CHAT"));
  // };
  // const last = useRef("");
  // const handleLogout = () => {
  //   setSession("");
  //   last.current = username;
  //   // navigate(getAppRoutes("HOME"));
  // };
  const handleLogin = async (username: string) => {
    const res = String(await login(username));
    console.log(res);

    if (res === getActionCode("USER_LOGIN")) {
      setSession(username);
      setError("");
      return navigate(getAppRoutes("CHAT"));
    }

    setError(getActionResponse(res as ActionCodeValue));
  };
  const last = useRef("");

  const handleLogout = async () => {
    last.current = username;
    const res = await logout(last.current);
    if (String(res) === getActionCode("USER_LOGOUT")) {
      setSession("");
      setError("");
    }

    setError(getActionResponse(res));
  };

  return {
    username,
    handleLogin,
    handleLogout,
    setUsername: setSession,
    error,
    last,
  };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;
