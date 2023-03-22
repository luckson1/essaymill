import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const paymentRouter = createTRPCRouter({
  addPayment: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        projectId: z.string(),
        payingEmail: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.payment.create({
        data: {
          userId: input.userId,
          projectId: input.projectId,
          payingEmail: input.payingEmail,
          amount: input.amount,
        },
      });

      const project = await ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          isPaid: true,
          status: "progress",
        },
      });
      return project;
    }),
});
