
import Link from "next/link";
import Landing from "./Landing";




const Home=  () => {

  return (
    <>
   
      <main className="flex h-fit min-h-[calc(100vh-16px)]  bg-gradient-to-b from-[#2e026d] to-[#15162c] w-full flex-col items-center justify-center  " >
  <div className="w-full md:w-[90%] lg:w-[80%]  px-5 md:px-0">

  <div className='flex flex-col w-full h-fit justify-center items-center'  >
       <div className="flex flex-col justify-around items-center md:flex-row w-[88%]  h-fit">
<div className="w-full md:w-3/5 flex flex-col gap-5 md:gap-10 md:mt-16 h-[40%] md:h-fit">
  
  <p className="text-3xl md:text-6xl text-base-100">ORIGINAL ACADEMIC
WRITING ON DEMAND</p>
<p className="text-xl italic text-base-100">Any Subject. Brilliant Writers. No AI or Plagiarism.</p>
<a href={"/order"}><button className="btn btn-accent w-full max-w-xs relative my-6" > Order</button></a></div>
     <Landing />
 </div>

     
    </div>
  </div>
      
      </main>
    </>
  );
};

export default Home;
