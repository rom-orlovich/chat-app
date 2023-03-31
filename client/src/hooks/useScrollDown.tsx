import { useEffect, useRef } from "react";
import { MessageProps } from "../types/messages.types";

function useScrollDown(message: MessageProps[]) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    console.log("change");
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return lastMessageRef;
}

export default useScrollDown;
