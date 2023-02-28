import { Router } from "express";
import { SigninController } from "../Controllers/Sigin.controller.js";
import SchemaMiddleware from "../Middleware/Schema.middleware.js";
import { SigninMiddleware } from "../Middleware/Signin.middleware.js";
import SigninSchema from "../Schemas/Signin.schema.js";

const SigninRouter = Router();

SigninRouter.post('/signin', SchemaMiddleware(SigninSchema), SigninMiddleware, SigninController);

export default SigninRouter;