import {  PrismaClient } from "@prisma/client";


import Interactivity from "./interactivity";
const prisma= new PrismaClient()



const Home= async () => {
const subjects= await prisma.subject.findMany()
  return (
    <>
   
      <main className="flex h-fit min-h-[calc(100vh-16px)]  bg-gradient-to-b from-[#2e026d] to-[#15162c] w-full flex-col items-center justify-center  " >
  <div className="w-full md:w-[90%] lg:w-[80%]  px-5 md:px-0">

  <Interactivity subjects={subjects}/>
  </div>
      
      </main>
    </>
  );
};

export default Home;
