import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SessionContext, { useSessionContext } from "../context/SessionContext";

import { getAppRoutes } from "../lib/appRoutes";

/**
 * Check if the user has exist session (username) in browser session.
 * If it does navigate to the chat page.
 * Otherwise navigate to the home page.
 */
function ProtectedRoute() {
  const { session } = useSessionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (session) navigate(getAppRoutes("CHAT"), { replace: true });
    else navigate(getAppRoutes("HOME"), { replace: true });
  }, []);

  return <Outlet />;
}

export default () => (
  <SessionContext>
    <ProtectedRoute />
  </SessionContext>
);
