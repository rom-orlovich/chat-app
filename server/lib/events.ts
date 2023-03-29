export const EMIT_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_CHAT: "1002",
  SEND_MESSAGE: "1003",
  BROADCAST_MESSAGES: "1004",
};

export const getEventName = (key: keyof typeof EMIT_EVENTS) => EMIT_EVENTS[key];
