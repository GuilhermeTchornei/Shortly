import { Router } from "express";
import { DELETEUrl, GETUrlById, OpenUrl, POSTUrl } from "../Controllers/Url.controller.js";
import { AuthMiddleware } from "../Middleware/Auth.middleware.js";
import { DELETEUrlMiddleware } from "../Middleware/Url.middleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', AuthMiddleware, POSTUrl);
urlRouter.get('/urls/:id', GETUrlById);
urlRouter.get('/urls/open/:shortUrl', OpenUrl);
urlRouter.delete('/urls/:id', AuthMiddleware, DELETEUrlMiddleware, DELETEUrl);

export default urlRouter;