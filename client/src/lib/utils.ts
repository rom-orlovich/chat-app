import { GenericRecord } from "../types/types";

export const classNameGenerator = (...classes: (string | undefined)[]) =>
  `${classes.filter((el) => el).join(" ")}`;

export const paramsURL = (params?: GenericRecord<any>) => {
  const newParamsURL = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (key && value) {
      newParamsURL.set(key, encodeURIComponent(value));
    }
  }
  return newParamsURL;
};

export const createURL = (...endpoints: string[]) =>
  endpoints.filter((endpoint) => endpoint).join("");

export const classIsOn = (
  isON: boolean,
  className: string,
  classNameElse = ""
) => (isON ? className : classNameElse);

export const getLocalTimeDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) =>
  date.toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    // dateStyle: "short",

    timeStyle: "short",
    ...options,
  });

export const getDateFromStr = (date: string) => new Date(date);
