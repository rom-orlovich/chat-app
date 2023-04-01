export const serverURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
  USERS: "/users",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

/**
 *Get app endpoints by endpoint key.
 */
export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];
