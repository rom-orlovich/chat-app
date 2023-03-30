import React, { createContext, PropsWithChildren, useContext } from "react";
import useStateSession, {
  ReturnTypeUseStateSession,
} from "../hooks/useStateSession";

const context = createContext<ReturnTypeUseStateSession>(
  {} as unknown as ReturnTypeUseStateSession
);

function SessionContext(props: PropsWithChildren) {
  const state = useStateSession({ id: "username", value: "" });

  return <context.Provider value={state}>{props.children}</context.Provider>;
}

export function useSessionContext() {
  return useContext(context);
}

export default SessionContext;
