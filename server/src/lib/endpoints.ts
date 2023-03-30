export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
  USERS: "/users",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];
