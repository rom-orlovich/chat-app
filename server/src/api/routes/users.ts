import express from "express";
import { getAppEndpoints } from "../../lib/endpoints";
import { loginUser, logoutUser } from "../controllers/users";

const routes = express.Router();
const authRouter = express.Router();

// Auth routes.
// GET - api/users/login
routes.get(getAppEndpoints("LOGIN"), loginUser);

// GET - api/users/logout
routes.get(getAppEndpoints("LOGOUT"), logoutUser);

authRouter.use(getAppEndpoints("USERS"), routes);

export const usersRoutes = authRouter;
