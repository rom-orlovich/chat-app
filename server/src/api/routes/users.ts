import express from "express";
import { getAppEndpoints } from "../../lib/endpoints";
import { loginUser, logoutUser } from "../controllers/users";

const routes = express.Router();
const authRoutes = express.Router();

// Auth routes
authRoutes.post(getAppEndpoints("LOGIN"), loginUser);
authRoutes.get(getAppEndpoints("LOGOUT"), logoutUser);

routes.use(getAppEndpoints("USERS"), authRoutes);

export const usersRoutes = routes;
