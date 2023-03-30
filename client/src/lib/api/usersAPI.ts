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
    const result = await messagesAPI.post<ActionCodeValue>(
      getAppEndpoints("LOGIN"),
      {
        username,
      }
    );
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export const logout = async (username: string) => {
  try {
    console.log(username);
    const result = await messagesAPI.get<ActionCodeValue>(
      getAppEndpoints("LOGOUT"),
      {
        params: paramsURL({ username }),
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return getActionCode("USERNAME_NOT_EXIST");
  }
};
