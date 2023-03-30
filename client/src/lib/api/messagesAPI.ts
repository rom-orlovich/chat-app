import axios from "axios";
import { getResMessage } from "../actionsCodes";
import { getAppEndpoints, serverURL } from "../endpoints";
import { Message, MessageSent } from "../types/messages.types";
import { createURL } from "../utils";

export const messagesUrlAPI = () =>
  createURL(
    serverURL,
    getAppEndpoints("API_PREFIX"),
    getAppEndpoints("MESSAGES")
  );
export const messagesAPI = axios.create({ baseURL: messagesUrlAPI() });

export const getMessages = async () => {
  const data = await messagesAPI.get<Message[]>("");
  return data.data;
};
export const createMessage = async (message: MessageSent) => {
  console.log(message);
  try {
    const data = await messagesAPI.post<string>("", message);
    return data;
  } catch (error) {
    console.log(error);
    return getResMessage("MESSAGE_NOT_CREATED");
  }
};