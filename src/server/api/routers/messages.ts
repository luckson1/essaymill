import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const messageSchema = z.object({ body: z.string(), projectId: z.string() });

export const messageRouter = createTRPCRouter({
  addMessage: protectedProcedure
    .input(messageSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const message = await ctx.prisma.message.create({
        data: {
          userId,
          body: input.body,
          projectId: input.projectId,
        },
      });
      return message;
    }),

  getMessages: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.findMany({
        where: {
          projectId: input.projectId,
        },
      });
      return message;
    }),
});
