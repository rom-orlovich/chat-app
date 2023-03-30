import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SessionContext, {
  useSessionContext,
} from "../../context/SessionContext";

import { getAppRoutes } from "../../lib/appRoutes";

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
