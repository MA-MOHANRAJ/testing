// convex/schedules.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByRoadmap = query({
  args: { roadmapId: v.id("roadmaps") },
  handler: async (ctx, { roadmapId }) => {
    return await ctx.db
      .query("schedules")
      .withIndex("by_roadmap", (q) => q.eq("roadmap_id", roadmapId))
      .order("asc")
      .collect();
  },
});

export const insertMany = mutation({
  args: {
    items: v.array(
      v.object({
        roadmap_id: v.id("roadmaps"),
        day: v.number(),
        tasks: v.array(
          v.object({
            title: v.string(),
            completed: v.boolean(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, { items }) => {
    const results = [];
    for (const item of items) {
      const id = await ctx.db.insert("schedules", item);
      results.push({ _id: id, ...item });
    }
    return results;
  },
});

export const update = mutation({
  args: {
    id: v.id("schedules"),
    tasks: v.array(
      v.object({
        title: v.string(),
        completed: v.boolean(),
      })
    ),
  },
  handler: async (ctx, { id, tasks }) => {
    await ctx.db.patch(id, { tasks });
  },
});