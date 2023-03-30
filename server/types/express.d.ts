import { Server } from "socket.io";

declare global {
  declare namespace Express {
    export interface Request {
      io: InstanceType<typeof Server>;
    }
  }
}
export {};
