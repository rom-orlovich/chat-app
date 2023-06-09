export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_LOGIN: "3000",
  USER_LOGOUT: "3001",
  USERNAME_EXIST: "3002",
  USERNAME_NOT_EXIST: "3003",
  USERNAME_NOT_VALID: "3004",
  USER_TYPING: "4005",
} as const;

type ActionCode = typeof ACTIONS_CODE;
export type ActionCodeKey = keyof ActionCode;
export const getActionCode = (key: ActionCodeKey) => ACTIONS_CODE[key];

export const ACTION_MESSAGE = {
  [getActionCode("USER_LOGIN")]: (username: string) =>
    `${username} joined the chat`,
  [getActionCode("USER_LOGOUT")]: (username: string) =>
    `${username} left the chat`,
  [getActionCode("USER_TYPING")]: (username: string) =>
    `${username} is currently typing`,
};

/**
 * Get the message for actions the execute in the server.
 */
export const getActionMessage = (key: ActionCodeKey) =>
  ACTION_MESSAGE[getActionCode(key)];
