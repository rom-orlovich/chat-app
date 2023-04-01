import { Server } from "socket.io";

export type Io = InstanceType<typeof Server>;
declare global {
  declare namespace Express {
    export interface Request {
      io: Io;
      loginUsers: Map<string, string>;
    }
  }
}
export {};
