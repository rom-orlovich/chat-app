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
  const [reason, setReason] = useState<string>("");
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
      setReason("");
      return navigate(getAppRoutes("CHAT"));
    }

    setReason(getActionResponse(res as ActionCodeValue));
  };
  const last = useRef("");

  const handleLogout = async () => {
    last.current = username;
    const res = await logout(last.current);
    if (String(res) === getActionCode("USER_LOGOUT")) {
      setSession("");
      setReason("");

      // return navigate(getAppRoutes("HOME"));
    }

    setReason(getActionResponse(res));
  };

  return {
    username,
    handleLogin,
    handleLogout,
    setUsername: setSession,
    reason,
    last,
  };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;

/**
 *  
 const handleLogin = async (name: string) => {
    const res = await login(name);
    console.log(String(res), getActionCode("USER_LOGIN"));
    if (String(res) === getActionCode("USER_LOGIN")) {
      setSession(name);
      setReason("");
      return navigate(getAppRoutes("CHAT"));
    }

    setReason(getActionResponse(res));
  };
  const last = useRef("");

  const handleLogout = async () => {
    last.current = username;
    const res = await logout(last.current);
    if (String(res) === getActionCode("USER_LOGOUT")) {
      setSession("");
      setReason("");
      return navigate(getAppRoutes("HOME"));
    }

    setReason(getActionResponse(res));
  };
 */
