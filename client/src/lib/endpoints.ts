import { createURL } from "./utils";

export const serverURL = process.env.REACT_APP_SERVER_URL || "";
export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
};

export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];

export const messagesUrlAPI = () =>
  createURL(
    serverURL,
    getAppEndpoints("API_PREFIX"),
    getAppEndpoints("MESSAGES")
  );
