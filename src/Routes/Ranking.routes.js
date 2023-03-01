import { Router } from "express";
import { GETRanking } from "../Controllers/Ranking.controller.js";

const rankingRouter = Router();

rankingRouter.get('/ranking', GETRanking);

export default rankingRouter;