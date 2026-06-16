import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env.PORT || "5000";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

async function initDB() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      scam_type VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      district VARCHAR(100) NOT NULL,
      contact_number VARCHAR(20),
      severity VARCHAR(20) DEFAULT 'moderate' NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);
}

initDB().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
});
