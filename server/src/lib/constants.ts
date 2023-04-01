import { createURL, getAppEndpoints } from "./endpoints";

export const GLOBAL_CHAT_ID = "global_chat";
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export const SERVER_URL_API = createURL(
  SERVER_URL,
  getAppEndpoints("API_PREFIX")
);
