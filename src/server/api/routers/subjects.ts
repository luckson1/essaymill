import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const subjectSchema=z.object({subjects: z.array(z.object({name: z.string()}))})
export const subjectRouter = createTRPCRouter({

addSubjects: publicProcedure
.input(subjectSchema)
.mutation(({input, ctx})=> {
    const subjects= ctx.prisma.subject.createMany({
        data: input.subjects,
      
    })
   return subjects 
}),
  getall: publicProcedure
  .query(({ctx})=> {
    return ctx.prisma.subject.findMany()
  })  
})

