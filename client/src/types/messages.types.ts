import { PickKey } from "./types";

export interface MessageProps {
  messageID: string;
  chatID: string;
  username: string;
  content: string;
  createdAt: string;
}

export type MessageEmitted = PickKey<
  MessageProps,
  "content" | "username" | "messageID"
> & {
  createdAt: Date;
};
