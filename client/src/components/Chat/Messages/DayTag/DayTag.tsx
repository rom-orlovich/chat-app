import React from "react";
import { getDateFromStr, getLocalTimeDate } from "src/lib/utils";
import { MessageProps } from "src/types/messages.types";

function DayTag({ createdAt }: { createdAt: string }) {
  const createdAtDate = getLocalTimeDate(new Date(createdAt), {
    dateStyle: "long",
  });
  return <div dir="rtl">{createdAtDate}</div>;
}

export default DayTag;
