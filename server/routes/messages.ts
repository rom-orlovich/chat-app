import express from "express";
import { getMessages } from "../controllers/messages";

import { getAppEndpoints } from "../lib/endpoints";

const routes = express.Router();
routes.get(getAppEndpoints("MESSAGES"), getMessages);
export const messageRoutes = routes;
