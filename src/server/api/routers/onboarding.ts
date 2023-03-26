
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
  format: z.enum(["Chicago", "APA", "MLA", "Harvard", "Other", "None"]),
});
export const onboardingRouter = createTRPCRouter({
  onboarding: publicProcedure
    .input(onboardingSchema)
    .mutation(async ({ input, ctx }) => {
  

      // find if user already exists
      const existingUser= await ctx.prisma.user.findFirstOrThrow({
        where: {
          email: input.email
        }
      })
      if (existingUser) {
        // create project
        const project = await ctx.prisma.project.create({
          data: {
            userId: existingUser.id,
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
      }

      //if user does not exist, create user first
  const name = input.firstName + " " + input.lastName;
  const userCreated = await ctx.prisma.user.create({
    data: {
      name,
      email: input.email,
    },
  });

  // create project
  const project = await ctx.prisma.project.create({
    data: {
      userId: userCreated.id,
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
