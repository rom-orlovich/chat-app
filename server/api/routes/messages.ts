import express from "express";
import { createMessage, getMessages } from "../controllers/messages";

import { getAppEndpoints } from "../../lib/endpoints";

const routes = express.Router();
routes.get(getAppEndpoints("MESSAGES"), getMessages);
routes.post(getAppEndpoints("MESSAGES"), createMessage);
export const messageRoutes = routes;
