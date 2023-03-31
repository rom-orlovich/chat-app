import React, { MouseEventHandler, useState } from "react";
import { SetState } from "src/hooks/hooks.types";

export interface ToggleChildrenProps {
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
  isON: boolean;
  setIsOff: SetState<boolean>;
}
interface ToggleProps {
  children: (props: ToggleChildrenProps) => void;
}

/**
 * This component enable to reuse the state of on/off to the children component.
 */
function Toggle({ children }: ToggleProps) {
  const [isON, setIsOff] = useState(false);

  // Handle the onClick event in order to change the state of the toggle.
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOff((pre) => !pre);
  };
  return (
    <>
      {children({
        setIsOff,
        handleOnClick,
        isON,
      })}
    </>
  );
}

export default Toggle;
