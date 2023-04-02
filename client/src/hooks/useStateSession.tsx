import { useEffect, useState } from "react";

/**
 * Help to integrate the state with browser's session storage.
 */
function useStateSession({ id, value }: { id: string; value: string }) {
  // Get current session by id or use the provided values.
  const getSession = () => window.sessionStorage.getItem(id) || value;

  const [session, setSession] = useState(getSession());

  // Each time the component unmount, save the values in the browser's session.
  useEffect(() => {
    window.sessionStorage.setItem(id, session);
  }, [session, id]);

  return { session, setSession } as const;
}
export type ReturnTypeUseStateSession = ReturnType<typeof useStateSession>;
export default useStateSession;
