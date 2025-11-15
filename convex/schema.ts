// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Existing users table (keep it exactly as you have it) ─────────────────────
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  // ── NEW: roadmaps table ───────────────────────────────────────────────────────
  roadmaps: defineTable({
    topic: v.string(),
    level: v.string(),
    quiz_responses: v.object({}),
    milestones: v.array(
      v.object({
        title: v.string(),
        duration_days: v.number(),
        tasks: v.array(v.string()),
        resources: v.array(v.string()),
      })
    ),
    userId: v.string(),
    created_at: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_topic", ["userId", "topic"]),

  // ── NEW: schedules table ───────────────────────────────────────────────────────
  schedules: defineTable({
    roadmap_id: v.id("roadmaps"),
    day: v.number(),
    tasks: v.array(
      v.object({
        title: v.string(),
        completed: v.boolean(),
      })
    ),
  })
    .index("by_roadmap", ["roadmap_id"])
    .index("by_roadmap_day", ["roadmap_id", "day"]),
});