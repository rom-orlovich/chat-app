import React, { ReactNode } from "react";
import { classNameGenerator } from "src/lib/utils";

export interface SidebarItemContentProps {
  icon: ReactNode;
  text: string;
  isOn: boolean;
  isONcontainerStyle?: string;
  isOFFcontainerStyle?: string;
}

const SidebarItemContentStyle = {
  isOnContent:
    "group flex justify-start items-center gap-3 w-full font-semibold",
  isOffContentContainer: "group relative flex justify-center",
  isOffContentItem:
    "absolute top-[-5px] hidden translate-x-[0px] rounded-md bg-white px-4 text-lg text-black shadow-lg min-w-[4rem]  text-center duration-100 group-hover:block group-hover:translate-x-[65px] group-hover:transition",
};
/**
 * SidebarItemContent component create hover effect when the sidebar is close and regular display when its on.
 */
function SidebarItemContent({
  icon,
  text,
  isOn,
  isOFFcontainerStyle,
  isONcontainerStyle,
}: SidebarItemContentProps) {
  // The content of the sidebar item one the sideBar is open.
  const isOnContent = (
    <div
      className={classNameGenerator(
        SidebarItemContentStyle.isOnContent,
        isONcontainerStyle
      )}
    >
      {icon && icon}
      {text}
    </div>
  );

  // The content of the sidebar item one the sideBar is close.
  const isOffContent = icon ? (
    <div
      className={classNameGenerator(
        SidebarItemContentStyle.isOffContentContainer,
        isOFFcontainerStyle
      )}
    >
      {icon}
      <span className={SidebarItemContentStyle.isOffContentItem}>{text}</span>
    </div>
  ) : (
    <>{text} </>
  );

  const curContent = isOn ? isOnContent : isOffContent;
  return curContent;
}

export default SidebarItemContent;
