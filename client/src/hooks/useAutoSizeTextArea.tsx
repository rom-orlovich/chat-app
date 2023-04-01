import { useEffect, useRef } from "react";

/**
 * Resize the size of the textarea according to the height of the textarea's scroll height.
 * When the user changes the lines in the textarea the height of textarea will change also.
 */
const useAutoSizeTextArea = (value: string) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    ref.current.style.height = "0px";
    const { scrollHeight } = ref.current;

    // We then set the height directly, outside of the render loop
    // Trying to set this with state or a ref will product an incorrect value.
    ref.current.style.height = `${scrollHeight}px`;
  }, [value]);
  return ref;
};

export default useAutoSizeTextArea;
