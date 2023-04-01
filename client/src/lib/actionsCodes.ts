import { ExtractKey } from "src/types/types";

export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_LOGIN: "3000",
  USER_LOGOUT: "3001",
  USERNAME_EXIST: "3002",
  USERNAME_NOT_EXIST: "3003",
  USERNAME_NOT_VALID: "3004",
} as const;

export type ActionCode = typeof ACTIONS_CODE;
export type ActionCodeKey = keyof typeof ACTIONS_CODE;
export type ActionCodeValue = ActionCode[ActionCodeKey];

export const getActionCode = (key: ActionCodeKey) => ACTIONS_CODE[key];

export const ACTIONS_RESPONSE = {
  [getActionCode("MESSAGE_CREATED")]: "Message was created successfully!",
  [getActionCode("MESSAGE_NOT_CREATED")]: "Message wasn't created!",
  [getActionCode("MESSAGES_FOUND")]: "Messages were found successfully",
  [getActionCode("USER_LOGIN")]: (username: string) =>
    `${username} joined the chat`,
  [getActionCode("USER_LOGOUT")]: (username: string) =>
    `${username} left the chat`,
  [getActionCode("USERNAME_EXIST")]: (username: string) =>
    `The username ${username} has already exist`,
  [getActionCode("USERNAME_NOT_EXIST")]: (username: string) =>
    `The username ${username} is not exist.`,
  [getActionCode("USERNAME_NOT_VALID")]: "Please insert a valid username.",
};

export type ActionResponseKey = keyof typeof ACTIONS_RESPONSE;

export const getActionResponse = (code: ActionResponseKey) =>
  ACTIONS_RESPONSE[code];

/**
Create general action message by message's code.
 */
export const getActionMessage = (keyCode: ActionCodeKey) => {
  const code = getActionCode(keyCode);
  return getActionResponse(code);
};

/**
 * Create action message by message code and username for events that relates to user's auth action.
 */
export const getActionMessageOfAuthEvent = (
  keyCode: ActionResponseKey,
  username: string
) => {
  const messageRes = getActionResponse(keyCode);

  const message =
    typeof messageRes === "function" ? messageRes(username) : messageRes;
  return message;
};
