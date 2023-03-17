
'use client'
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
const handleLogin= () =>  signIn("google", { callbackUrl: "/dashboard" })

export const LoginCard = () => {
  return (
    <div className="items-centerpx-10 absolute left-0 right-0 top-20 ml-auto mr-auto flex h-fit w-6/12  flex-row justify-center   rounded-lg bg-base-100 pb-7 pt-5 shadow-2xl  sm:top-28 md:w-6/12 md:gap-5 ">
      <section className=" w-10/11 flex flex-col items-center justify-center">
        <div className="mb-5 flex w-72 flex-row gap-3">
          <p className="mb-3 tracking-wider text-primary">Continue With:</p>
        </div>

        <>
          <button
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ 
            onClick={handleLogin}
            className=" mb-5 flex h-10 w-72 flex-row items-center justify-between rounded border-2 border-primary px-7"
          >
            <p className="tracking-[5px] text-primary">Google </p>
            <FcGoogle size={"30px"} />
          </button>
        
        </>
      </section>
    </div>
  );
};
