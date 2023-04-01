export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
  USERS: "/users",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];

export const createURL = (...endpoints: string[]) =>
  endpoints.filter((endpoint) => endpoint).join("");

export const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export const SERVER_URL_API = createURL(
  SERVER_URL,
  getAppEndpoints("API_PREFIX")
);
