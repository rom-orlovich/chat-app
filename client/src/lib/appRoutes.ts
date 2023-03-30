export const APP_ROUTES = {
  HOME: "/",
  CHAT: "/chat",
};

export const getAppRoutes = (key: keyof typeof APP_ROUTES) => APP_ROUTES[key];
