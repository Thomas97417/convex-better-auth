import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("articles").collect();
  },
});

export const getById = query({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    author: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const newArticleId = await ctx.db.insert("articles", {
      title: args.title,
      content: args.content,
      author: args.author,
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
    });
    return await ctx.db.get(newArticleId);
  },
});

export const update = mutation({
  args: {
    id: v.id("articles"),
    title: v.string(),
    content: v.string(),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      updatedAt: args.updatedAt,
    });
  },
});

export const deleteArticle = mutation({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
