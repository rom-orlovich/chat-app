import express from "express";
import { messageRoutes } from "./routes/messages";
import { usersRoutes } from "./routes/users";

const router = express.Router();

// Messages Routes.
router.use(messageRoutes);

// Users Routes.
router.use(usersRoutes);

export const apiRoutes = router;
