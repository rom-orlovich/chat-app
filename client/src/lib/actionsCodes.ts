export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_LOGIN: "3000",
  USER_LOGOUT: "3001",
  USERNAME_EXIST: "3002",
  USERNAME_NOT_EXIST: "3003",
} as const;

export type ActionCode = typeof ACTIONS_CODE;
export type ActionCodeKey = keyof typeof ACTIONS_CODE;
export type ActionCodeValue = ActionCode[ActionCodeKey];

export const getActionCode = (key: ActionCodeKey) => ACTIONS_CODE[key];

export const ACTIONS_RESPONSE = {
  [getActionCode("MESSAGE_CREATED")]: "Message was created successfully!",
  [getActionCode("MESSAGE_NOT_CREATED")]: "Message wasn't created!",
  [getActionCode("MESSAGES_FOUND")]: "Messages were found successfully",
  [getActionCode("USER_LOGIN")]: "The user was logged in successfully!",
  [getActionCode("USER_LOGOUT")]: "The user was logged out successfully!",
  [getActionCode("USERNAME_EXIST")]: (username: string) =>
    `The username ${username} has already exist`,
  [getActionCode("USERNAME_NOT_EXIST")]: (username: string) =>
    `The username ${username} is not exist.`,
} as Record<ActionCodeValue, string | ((username: string) => string)>;

export const getActionResponse = (code: keyof typeof ACTIONS_RESPONSE) =>
  ACTIONS_RESPONSE[code];

export const getActionMessage = (keyCode: ActionCodeKey) => {
  const code = getActionCode(keyCode);
  return {
    message: getActionResponse(code),
  };
};
