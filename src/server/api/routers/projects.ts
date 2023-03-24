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
  getUserUnreadMessages: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const projects = await ctx.prisma.project.findMany({
      where: {
        userId,
        deleted: false,
      },
    
      select: {
       

        Message:{
          where:{
            isRead: false,
            
          },
          select:{
            id: true,
            projectId: true,
            body: true,
            creator :{
              select: {
                name: true,
                image: true,
                id: true
              }
            }
          }
        }
      }
    });
    const messages=projects?.map(p=> p.Message).flat()
    
    // check the message that were not created by the user in current session
    const unreadMsgs=messages?.filter(message=> message.creator.id !== userId)

    return unreadMsgs;
  }),
  getAllUnreadMessages: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const projects = await ctx.prisma.project.findMany({
      where: {
        deleted: false,
      },
    
      select: {
        id: true,
        orderNumber: true,

        Message:{
          where:{
            isRead: false,
            
          },
          select:{
            id: true,
            projectId: true,
            body: true,
            creator :{
              select: {
                name: true,
                image: true,
                id: true
              }
            }
          }
        }
      }
    });
    const messages=projects?.map(p=> p.Message).flat()
        // check the message that were not created by the user in current session
    const unreadMsgs=messages?.filter(message=> message.creator.id !== userId)
    return unreadMsgs;
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
        include: {
          subject: true
        }
      });
      return projects;
    }),
  getOneProject: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const projects = await ctx.prisma.project.findFirstOrThrow({
      where: {
       
        deleted: false,
        id: input.id,
      },
      include: {
        subject: true
      }
    });
    return projects;
  }),
getUserProjectsByStatus: protectedProcedure.input(z.object({status:z.enum([ "draft",
"progress",
  "revision",
  "review",
  "complete",
  "closed",
  "cancelled"])})).query(async ({ctx, input})=> {
    const userId=ctx.session.user.id
const projects= await ctx.prisma.project.findMany({
  where: {
    userId,
    status: input.status
  },
  include: {
    user:{
     select: {
      name: true
     }
    },
    subject: true
  },
  
})
return projects
  }),
  getAllProjectsByStatus: protectedProcedure.input(z.object({status:z.enum([ "draft",
"progress",
  "revision",
  "review",
  "complete",
  "closed",
  "cancelled"])})).query(async ({ctx, input})=> {

const projects= await ctx.prisma.project.findMany({
  where: {
    status: input.status,
    deleted: false
  },
  include: {
    user:{
     select: {
      name: true
     }
    },
    subject: true
  },
  
})
return projects
  }),
  updateProjectStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(["draft",
    "progress",
      "revision",
      "review",
      "complete",
      "closed",
      "cancelled"])}))
    .mutation(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
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
