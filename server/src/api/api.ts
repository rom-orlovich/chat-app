import express from "express";
import { getAppEndpoints } from "../lib/endpoints";
import { getRequestExtendMiddleware } from "./middleware/middleware";
import { messageRoutes } from "./routes/messages";
import { usersRoutes } from "./routes/users";

// app.use(getAppEndpoints("API_PREFIX"), requestExtendMiddleware, usersRoutes);

const router = express.Router();

// Messages Routes.
router.use(messageRoutes);

// Users Routes.
router.use(usersRoutes);

export const apiRoutes = router;
