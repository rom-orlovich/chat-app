import { Server } from "socket.io";

export type Io = InstanceType<typeof Server>;
declare global {
  declare namespace Express {
    export interface Request {
      loginUsers: Map<string, string>;
    }
  }
}
export {};
