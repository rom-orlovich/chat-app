/* eslint-disable no-promise-executor-return */
import { AnyFun, GenericRecord } from "../types/types";

/**
 * @param {(string|undefined)[]} classes an array of classes as string if they exist or undefined if they don't.
 * @returns {string} literal string that contains all the classes with spaces between them.
 */
export const classNameGenerator = (...classes: (string | undefined)[]) =>
  `${classes.filter((el) => el).join(" ")}`;

/**
 * Create url params query.
 */
export const paramsURL = (params?: GenericRecord<any>) => {
  const newParamsURL = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (key && value) {
      newParamsURL.set(key, encodeURIComponent(value));
    }
  }
  return newParamsURL;
};

/**
 * Create url by endpoints.
 */
export const createURL = (...endpoints: string[]) =>
  endpoints.filter((endpoint) => endpoint).join("");

/**
 * Set a class if the condition is truthy.
 */
export const classIsOn = (
  isON: boolean,
  className: string,
  classNameElse = ""
) => (isON ? className : classNameElse);

/**
 * Get local time.
 */
export const getLocalTimeDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) =>
  date.toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    timeStyle: "short",
    ...options,
  });

/**
 * Get Date from string format of date.
 */

export const getDateFromStr = (date: string) => new Date(date);

/**
 * Delay a cb function execution.
 */
export const delayFun = (cb: AnyFun, delay: number) =>
  new Promise((res) =>
    setTimeout(async () => {
      res(await cb());
    }, delay)
  );
