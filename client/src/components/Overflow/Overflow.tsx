import React, { PropsWithChildren } from "react";
import { classNameGenerator } from "../../lib/utils";

interface OverflowProps {
  outerElementClass: string;
  innerElementClass: string;
  activeClassInner?: string;
  activeClassOuter?: string;
  active: boolean;
}

/**
 * Create dynamic overflow-y element by active condition the activate the overflow style.
 */
function Overflow({
  children,
  active,
  outerElementClass,
  innerElementClass,
  activeClassInner,
  activeClassOuter,
}: PropsWithChildren & OverflowProps) {
  // Active the overflow effect.
  const isActive = (...className: (string | undefined)[]) =>
    `${active ? classNameGenerator(...className) : ""}`;
  return (
    <div
      className={classNameGenerator(
        outerElementClass,
        isActive("h-[14rem]", activeClassOuter),
        "overflow-x-hidden"
      )}
    >
      <div
        className={classNameGenerator(
          innerElementClass,

          isActive("max-h-[40rem] min-h-[15rem]", activeClassInner)
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Overflow;
