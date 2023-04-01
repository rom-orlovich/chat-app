import express from "express";
import { getAppEndpoints } from "../../lib/endpoints";
import { createMessage, getMessages } from "../controllers/messages";

// Messages routes.
const router = express.Router();

router
  .route(getAppEndpoints("MESSAGES"))
  .get(getMessages) // GET - api/messages.
  .post(createMessage); // POST - api/messages.

export const messageRoutes = router;
