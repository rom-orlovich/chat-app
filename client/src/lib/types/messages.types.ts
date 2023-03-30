import { PickKey } from "./types";

export interface Message {
  messageID: string;
  chatID: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export type MessageSent = PickKey<Message, "content" | "senderName"> & {
  createdAt: Date;
};
