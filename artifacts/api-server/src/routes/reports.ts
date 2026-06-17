import { Router } from "express";
import { db } from "@workspace/db";
import { reportsTable, insertReportSchema } from "@workspace/db/schema";
import { SubmitReportBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router = Router();

let mockReports: any[] = [];
let nextId = 1;

router.get("/reports", async (req, res) => {
  try {
    const sorted = [...mockReports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);
    res.json(sorted);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch reports");
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

router.post("/reports", async (req, res) => {
  const parsed = SubmitReportBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.issues });
    return;
  }

  try {
    const newReport = {
      id: nextId++,
      scamType: parsed.data.scamType,
      description: parsed.data.description,
      district: parsed.data.district,
      contactNumber: parsed.data.contactNumber || null,
      severity: parsed.data.severity || "moderate",
      createdAt: new Date().toISOString()
    };
    mockReports.push(newReport);
    res.json({ success: true, id: newReport.id });
  } catch (err) {
    req.log.error({ err }, "Failed to submit report");
    res.status(500).json({ error: "Failed to submit report" });
  }
});

export default router;
