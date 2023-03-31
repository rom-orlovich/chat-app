import { PickKey } from "./types";

export interface MessageProps {
  messageID: string;
  chatID: string;
  username: string;
  content: string;
  createdAt: string;
}

export type MessageSent = PickKey<MessageProps, "content" | "username"> & {
  createdAt: Date;
};
