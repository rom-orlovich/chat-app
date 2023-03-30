import express from "express";
import { getAppEndpoints } from "../../lib/endpoints";
import { createMessage, getMessages } from "../controllers/messages";

const routes = express.Router();
routes.get(getAppEndpoints("MESSAGES"), getMessages);
routes.post(getAppEndpoints("MESSAGES"), createMessage);
export const messageRoutes = routes;
