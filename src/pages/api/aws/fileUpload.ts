
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { env } from "~/env.mjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient()

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

try { 

  console.log(req.query)
  const projectId= (req.query.projectId as string)
  const typeSchema=z.enum([ "customerFile" ,  "DraftFIle" , "FinalFile"])
  const type= (req.query.type as z.infer<typeof typeSchema>)
  const name= (req.query.name as string)
  const userId= (req.query.userId as string)
    // make entries to file table for the product files
   

  const file = await prisma.file.create({
    data: {
      name,
      userId,
      projectId,
    type
    },})
  
    const Key = file.id;
  
    const s3Params = {
      Bucket: env.BUCKET_NAME,
      Key,
      Expires: 60,
  
    };
  
    const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
  
  
  
    res.status(200).json({
      uploadUrl,
      key: Key,
    });
  
} catch (error) {
  console.log(error)
}
}