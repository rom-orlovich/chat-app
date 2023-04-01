import { Socket } from "socket.io";

import { Io } from "../../types/express";
import { getEventName } from "../../lib/events";

import { MessageToDB } from "../../mongoDB/handlers/messages";
import { getActionMessage } from "../../lib/actionsCodes";
import { createMessageByUsingAPI, createSysMessageObj } from "./utils";

export const GLOBAL_CHAT_ID = "global_chat";

export const handlers = (
  io: Io,
  socket: Socket,
  loginUsers: Map<string, string>
) => {
  const getLoginUsers = () => [...loginUsers.values()];

  const chat = io.to(GLOBAL_CHAT_ID);

  const userJoinChatHandler = async (username: string) => {
    // Join the socket.
    try {
      await socket.join(GLOBAL_CHAT_ID);
      console.log(getActionMessage("USER_LOGIN")(username));

      // Add the login user.
      loginUsers.set(socket.id, username);

      // Insert message to db.
      const message: MessageToDB = createSysMessageObj("USER_LOGIN", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
    } catch (error) {
      console.log(error);
    }
  };

  const userLeaveChatHandler = async (username: string) => {
    try {
      // Leave socket.
      await socket.leave(GLOBAL_CHAT_ID);
      socket.disconnect();
      console.log(getActionMessage("USER_LOGOUT")(username));

      // Delete the login user.
      loginUsers.delete(socket.id);

      // Insert message to db.
      const message: MessageToDB = createSysMessageObj("USER_LOGOUT", username);
      await createMessageByUsingAPI(message);

      // Update the client about the current login users.
      chat.emit(getEventName("BROADCAST_CURRENT_LOGIN_USERS"), getLoginUsers());
    } catch (error) {
      console.log(error);
    }

    // const message: MessageToDB = createSysMessageObj("USER_LOGOUT", username);

    // try {
    //   const res = await axios.post(
    //     `${server}${getAppEndpoints("API_PREFIX")}${getAppEndpoints(
    //       "MESSAGES"
    //     )}`,
    //     message
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    // await createMessageInDB(message);

    // // Emit the message to the client.
    // chat.emit(getEventName("BROADCAST_NEW_MESSAGE"), message);
  };

  return { userJoinChatHandler, userLeaveChatHandler };
};
