/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppRoutes } from "src/lib/appRoutes";
import { useSessionContext } from "../context/SessionContext";
import {
  getActionMessageOfAuthEvent,
  getActionCode,
} from "../lib/actionsCodes";
import { login } from "../lib/api/usersAPI";

/**
 * Manage the session state of the user.
 */
function useAuth() {
  const { session: username, setSession } = useSessionContext();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle login.
  const handleLogin = async (username: string) => {
    const res = await login(username);
    const actionCode = String(res);

    // If the action code is not for user login so set error.
    if (actionCode !== getActionCode("USER_LOGIN")) {
      const message = getActionMessageOfAuthEvent(res, username);
      alert(message);
      return setError(message);
    }

    // Set the current username, clean the error and navigate to chat page.
    setSession(username);
    setError("");
    return navigate(getAppRoutes("CHAT"));
  };

  // Handle Logout.
  const handleLogout = async () => {
    // Clean the current username, clean the error. The navigation to home page execute  and navigate to chat page.
    setSession("");
    setError("");
    return navigate(getAppRoutes("HOME"));
  };

  return {
    username,
    handleLogin,
    handleLogout,
    setUsername: setSession,
    error,
  };
}
export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export default useAuth;
