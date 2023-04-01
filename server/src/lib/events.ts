export const EMIT_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_CHAT: "1002",
  LEAVE_CHAT: "1003",
  SEND_MESSAGE: "1004",
  BROADCAST_NEW_MESSAGE: "1005",
  BROADCAST_NEW_CHAT_JOINS: "1006",
  BROADCAST_CHAT_LEAVING: "1007",
  BROADCAST_CURRENT_LOGIN_USERS: "1008",
  BROADCAST_TYPING: "1009",
};

/**
 * Get socket's event code
 */
export const getEventCode = (key: keyof typeof EMIT_EVENTS) => EMIT_EVENTS[key];
