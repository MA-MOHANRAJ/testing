// convex/roadmaps.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("roadmaps")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const insert = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("roadmaps", {
      ...args,
      created_at: new Date().toISOString(),
    });
    return { _id: id, ...args, created_at: new Date().toISOString() };
  },
});