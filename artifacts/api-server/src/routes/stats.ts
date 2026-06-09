import { Router } from "express";

const router = Router();

router.get("/stats", (req, res) => {
  res.json({
    safetyScore: 85,
    internetUsersPercent: 70,
    scamVictimsPercent: 19,
    readinessPercent: 74,
    awarenessCount: "5k+",
    trend: "Better than last month",
  });
});

export default router;
