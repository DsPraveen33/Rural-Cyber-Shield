import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  scamType: varchar("scam_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  district: varchar("district", { length: 100 }).notNull(),
  contactNumber: varchar("contact_number", { length: 20 }),
  severity: varchar("severity", { length: 20 }).default("moderate").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReportSchema = createInsertSchema(reportsTable).omit({ id: true, createdAt: true });
export const selectReportSchema = createSelectSchema(reportsTable);

export type Report = typeof reportsTable.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;