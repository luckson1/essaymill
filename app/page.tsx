import {  PrismaClient } from "@prisma/client";


import Interactivity from "./interactivity";
const prisma= new PrismaClient()



const Home= async () => {
const subjects= await prisma.subject.findMany()
  return (
    <>
   
      <main className="flex h-fit min-h-[calc(100vh-16px)] w-full flex-col items-center justify-center  " >
    <Interactivity subjects={subjects}/>
      
      </main>
    </>
  );
};

export default Home;
