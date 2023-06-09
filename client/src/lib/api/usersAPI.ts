import axios, { AxiosError } from "axios";

import { ActionCodeValue, getActionCode } from "../actionsCodes";
import { getAppEndpoints, serverURL } from "../endpoints";
import { createURL, paramsURL } from "../utils";

export const usersUrlAPI = createURL(
  serverURL,
  getAppEndpoints("API_PREFIX"),
  getAppEndpoints("USERS")
);

export const messagesAPI = axios.create({ baseURL: usersUrlAPI });

export const login = async (username: string) => {
  try {
    const result = await messagesAPI.get<ActionCodeValue>(
      getAppEndpoints("LOGIN"),
      { params: paramsURL({ username }) }
    );
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data as ActionCodeValue;
  }
};
