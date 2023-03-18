import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
export const productSchema = z.object({
  topic: z.string(),
  description: z.string(),
  subjectId: z.string(),
  country: z.string(),
  deadline: z.string(),
  pages: z.number(),
  academicLevel: z.enum(["undergraduate", "graduate", "phd"]),
  typeOfPaper: z.enum(["essay", "researchPaper", "dissertation"]),
  format: z.enum(["Chicago", "APA", "MLA", "Havard", "Other", "No", "None"]),
});
export const projectRouter = createTRPCRouter({
  addProduct: protectedProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const project = await ctx.prisma.project.create({
        data: {
          userId,
          topic: input.topic,
          description: input.description,
          subjectId: input.subjectId,
          country: input.country,
          academicLevel: input.academicLevel,
          format: input.format,
          pages: input.pages,
          typeOfPaper: input.typeOfPaper,
          deadline: input.deadline,
        },
      });
      return project;
    }),

  getAllUserProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const projects = await ctx.prisma.project.findMany({
      where: {
        userId,
        deleted: false,
      },
    });
    return projects;
  }),
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      where: {
        deleted: false,
      },
    });
    return projects;
  }),

  getOneUserProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const projects = await ctx.prisma.project.findFirstOrThrow({
        where: {
          userId,
          deleted: false,
          id: input.id,
        },
      });
      return projects;
    }),
  getOnerProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findFirstOrThrow({
        where: {
          deleted: false,
          id: input.id,
        },
      });
      return projects;
    }),

  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          deleted: true,
        },
      });
      return projects;
    }),
});
