export const EMIT_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_CHAT: "1002",
  LEAVE_CHAT: "1003",
  SEND_MESSAGE: "1004",
  BROADCAST_MESSAGES: "1005",
};

export const getEventName = (key: keyof typeof EMIT_EVENTS) => EMIT_EVENTS[key];
