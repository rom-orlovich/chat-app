import { PickKey } from "./types";

export interface Message {
  messageID: string;
  chatID: string;
  username: string;
  content: string;
  createdAt: string;
}

export type MessageSent = PickKey<Message, "content" | "username"> & {
  createdAt: Date;
};
