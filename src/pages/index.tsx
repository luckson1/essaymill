import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from "react";
import Order from "~/components/forms/order";
import Landing from "~/components/svgs/Landing";


const Home: NextPage = () => {
const [isShowForm, setIsShowForm]=useState(false)
const [animationParent] = useAutoAnimate()
  return (
    <>
      <Head>
        <title>Essaysdoctor</title>
        <meta name="description" content="Quality Plagiarism-free Essays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-fit min-h-[calc(100vh-16px)] w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] " ref={animationParent}>
      {!isShowForm && <div className="flex flex-col justify-around items-center md:flex-row w-[88%]  h-fit">
<div className="w-full md:w-2/3 flex flex-col gap-5 md:gap-10 md:mt-16 ">
  
  <p className="text-3xl md:text-6xl text-base-100">ORIGINAL ACADEMIC
WRITING ON DEMAND</p>
<p className="text-xl italic text-base-100">Any Subject. Brilliant Writers. No AI or Plagiarism.</p>
  <button className="btn btn-primary w-full max-w-xs relative" onClick={()=> setIsShowForm(true)}>Order</button></div>
     <Landing />
 </div>}

      {isShowForm && <Order setIsShowForm={setIsShowForm} />}
      
      </main>
    </>
  );
};

export default Home;
