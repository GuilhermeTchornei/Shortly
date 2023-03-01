import { Router } from "express";
import { GETuser } from "../Controllers/User.controller.js";
import { AuthMiddleware } from "../Middleware/Auth.middleware.js";

const userRouter = Router();

userRouter.get('/users/me', AuthMiddleware, GETuser);


export default userRouter;