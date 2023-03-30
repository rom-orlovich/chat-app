export const ACTIONS_CODE = {
  MESSAGE_CREATED: "2000",
  MESSAGE_NOT_CREATED: "2001",
  MESSAGES_FOUND: "2002",
  USER_CREATED: "3000",
  USER_NOT_CREATED: "3001",
  USERNAME_EXIST: "3002",
} as const;

export const getActionCode = (key: keyof typeof ACTIONS_CODE) =>
  ACTIONS_CODE[key];

export const ACTIONS_RESPONSE = {
  [getActionCode("MESSAGE_CREATED")]: "Message was created successfully!",
  [getActionCode("MESSAGE_NOT_CREATED")]: "Message wasn't created!",
  [getActionCode("MESSAGES_FOUND")]: "Messages were found successfully",
  [getActionCode("USER_CREATED")]: "The user was created successfully!",
  [getActionCode("USERNAME_EXIST")]: (username: string) =>
    `The username ${username} has already exist`,
} as const;

export const getResMessage = <KeyCode extends keyof typeof ACTIONS_CODE>(
  keyCode: KeyCode
) => {
  const code = getActionCode(keyCode);
  return {
    message: ACTIONS_RESPONSE[code],
  };
};
