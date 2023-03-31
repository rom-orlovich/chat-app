import { useEffect, useRef } from "react";

const useAutoSizeTextArea = (value: string) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (!value) return;
    if (!ref.current) return;
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    ref.current.style.height = "0px";
    const { scrollHeight } = ref.current;

    // We then set the height directly, outside of the render loop
    // Trying to set this with state or a ref will product an incorrect value.
    ref.current.style.height = `${scrollHeight}px`;
  }, [ref.current, value]);
  return ref;
};

export default useAutoSizeTextArea;
