import { Router } from "express";
import { POSTSignup } from "../Controllers/Signup.controller.js";
import SchemaMiddleware from "../Middleware/Schema.middleware.js";
import { SignupMiddleware } from "../Middleware/Signup.middleware.js";
import SignupSchema from "../Schemas/Signup.schema.js";

const SignupRouter = Router();

SignupRouter.post('/signup', SchemaMiddleware(SignupSchema), SignupMiddleware, POSTSignup);

export default SignupRouter;