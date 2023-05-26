import { S3 } from "aws-sdk";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc";


const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region: env.REGION,
    signatureVersion: "v4",
  });
  

  export const fileRouter= createTRPCRouter({
  
    getUserFiles: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx , input}) => {
      const { projectId } = input;
      const files = await ctx.prisma.file.findMany({
        where: {
            projectId,
          deleted: false
        },
      
      });

   
const extendedFiles= await Promise.all(files.map(async(file)=> {
    return {
        ...file,
        url: await s3.getSignedUrlPromise("getObject", {
            Bucket: env.BUCKET_NAME,
            Key: `${file.id}`
        })
    }
}));
return extendedFiles
    }),
    //delete a file

  delete: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input, ctx }) => {
    const { id } = input;
    return ctx.prisma.file.update({
      where: {
        id,
      },
      data: {
        deleted: true
      }
    });
  }),
  })