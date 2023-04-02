import axios from "axios";

import { getAppEndpoints, serverURL } from "../endpoints";
import { MessageProps } from "../../types/messages.types";
import { createURL } from "../utils";

export const messagesUrlAPI = createURL(
  serverURL,
  getAppEndpoints("API_PREFIX"),
  getAppEndpoints("MESSAGES")
);

export const messagesAPI = axios.create({ baseURL: messagesUrlAPI });

export const getMessages = async () => {
  const data = await messagesAPI.get<MessageProps[]>("");
  return data.data;
};
// export const createMessage = async (message: MessageEmitted) => {
//   try {
//     const data = await messagesAPI.post<string>("", message);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return getActionMessage("MESSAGE_NOT_CREATED");
//   }
// };
