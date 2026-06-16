import { Router } from "express";
import { db } from "@workspace/db";
import { reportsTable, insertReportSchema } from "@workspace/db/schema";
import { SubmitReportBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/reports", async (req, res) => {
  try {
    const reports = await db
      .select()
      .from(reportsTable)
      .orderBy(desc(reportsTable.createdAt))
      .limit(10);
      
    // Format the date to match the OpenAPI schema expectations (ISO string)
    const formattedReports = reports.map(r => ({
      ...r,
      createdAt: r.createdAt.toISOString()
    }));

    res.json(formattedReports);
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
    const [inserted] = await db
      .insert(reportsTable)
      .values({
        scamType: parsed.data.scamType,
        description: parsed.data.description,
        district: parsed.data.district,
        contactNumber: parsed.data.contactNumber || null,
        severity: parsed.data.severity || "moderate",
      })
      .returning({ id: reportsTable.id });

    res.json({ success: true, id: inserted.id });
  } catch (err) {
    req.log.error({ err }, "Failed to submit report");
    res.status(500).json({ error: "Failed to submit report" });
  }
});

export default router;
