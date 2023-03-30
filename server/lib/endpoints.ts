export const APP_ENDPOINTS = {
  API_PREFIX: "/api",
  MESSAGES: "/messages",
};

export const getAppEndpoints = (key: keyof typeof APP_ENDPOINTS) =>
  APP_ENDPOINTS[key];
