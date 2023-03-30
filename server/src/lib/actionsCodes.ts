export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_CREATED: "3000",
  USER_NOT_CREATED: "3001",
} as const;

export const getActionCode = (key: keyof typeof ACTIONS_CODE) =>
  ACTIONS_CODE[key];
