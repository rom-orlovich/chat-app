import React from "react";
import { getLocalTimeDate } from "src/lib/utils";

function DayTag({ createdAt }: { createdAt: string }) {
  const createdAtDate = getLocalTimeDate(new Date(createdAt), {
    dateStyle: "long",
  });
  return (
    <li dir="rtl" className="card self-center p-2">
      {createdAtDate}
    </li>
  );
}

export default DayTag;
