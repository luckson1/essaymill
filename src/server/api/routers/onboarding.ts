import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const onboardingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
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
export const onboardingRouter = createTRPCRouter({
  onboarding: publicProcedure
    .input(onboardingSchema)
    .mutation(async ({ input, ctx }) => {
      const name = input.firstName + input.lastName;
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email: input.email,
        },
      });

      const project = await ctx.prisma.project.create({
        data: {
          userId: user.id,
          topic: input.topic,
          description: input.description,
          subjectId: input.subjectId,
          country: input.country,
          academicLevel: input.academicLevel,
          format: input.format,
          pages: input.pages,
          typeOfPaper: input.typeOfPaper,
          deadline: input.deadline
        },
      });
      return project;
    }),
});
