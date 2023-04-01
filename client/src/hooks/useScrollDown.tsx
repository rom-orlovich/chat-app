import { useEffect, useRef } from "react";
import { delayFun } from "src/lib/utils";
import { MessageProps } from "../types/messages.types";

function useScrollDown(messages: MessageProps[]) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    delayFun(
      () => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  }, [lastMessageRef.current, messages]);

  return lastMessageRef;
}

export default useScrollDown;
