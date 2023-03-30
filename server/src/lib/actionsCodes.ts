export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_LOGIN: "3000",
  USER_LOGOUT: "3001",
  USERNAME_EXIST: "3002",
  USERNAME_NOT_EXIST: "3003",
} as const;

export const getActionCode = (key: keyof typeof ACTIONS_CODE) =>
  ACTIONS_CODE[key];
