
'use client'
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {  useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const handleLogin= () =>  signIn("google", { callbackUrl: "/dashboard" })

export const LoginCard = () => {
  const emailSchema=z.object({email: z.string().email({message: "Enter a Valid Email!"}).nonempty("Email Required!"),})
  type Value=z.infer<typeof emailSchema>
  const {register,   handleSubmit,
        
getValues,
     formState: { errors }, }= useForm<Value>({
      resolver: zodResolver(emailSchema),
    });
    const values=getValues()
  return (
    <div className="items-center px-10 absolute left-0 right-0 top-20 ml-auto mr-auto flex h-fit w-96 card  flex-row justify-center   rounded-lg bg-base-100 pb-7 pt-5 shadow-2xl  sm:top-28 md:w-6/12 md:gap-5 ">
      <section className="  card-body justify-center items-center">
        <div className="mb-5 flex w-72 flex-row gap-3">
          <p className="mb-3 tracking-wider text-primary">Continue With:</p>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-5">
          <button
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ 
            onClick={handleLogin}
            className=" btn btn-primary btn-outline w-full max-w-xs"
          >
            <p className="tracking-[5px]">Google </p>
            <FcGoogle size={"30px"} />
          </button>
          
        Or 

        <form className=" flex flex-col w-full justify-center items-center" 
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(data=> signIn("email", {email: data.email, callbackUrl: "/dashboard"}))}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("email")}

          />
             <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="email"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
          <button className="btn btn-primary w-full max-w-xs">Continue With Email</button>

        </form>
        </div>
      </section>
    </div>
  );
};
