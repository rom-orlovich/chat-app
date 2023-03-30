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
  return newParamsURL.toString();
};

export const createURL = (...endpoints: string[]) =>
  endpoints.filter((endpoint) => endpoint).join("");
