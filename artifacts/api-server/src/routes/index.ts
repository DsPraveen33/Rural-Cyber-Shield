import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import checkLinkRouter from "./check-link";
import tipsRouter from "./tips";
import threatsRouter from "./threats";
import quizRouter from "./quiz";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(checkLinkRouter);
router.use(tipsRouter);
router.use(threatsRouter);
router.use(quizRouter);
router.use(statsRouter);

export default router;
