export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
  USERS: "/users",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

/**
 * Get server url's endpoint.
 */
export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];

/**
 * Create url from endpoints params.
 */
export const createURL = (...endpoints: string[]) =>
  endpoints.filter((endpoint) => endpoint).join("");
