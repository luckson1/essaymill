'use client'

import Link from 'next/link'
import { TfiHome } from "react-icons/tfi";
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MdClose, MdMenu } from 'react-icons/md';


const NavbarMarketing = () => {
    const router=useRouter()
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const handleLogout = useCallback(async() => {
        await signOut();
      }, []);
    

      const { status } = useSession();
      const authenticated = status === "authenticated";
      if(authenticated) {router.push("/home")}
  return (

    <nav className=' bg-gradient-to-b from-[#2e026d] to-[#15162c] w-full flex justify-center items-center text-base-100 z-100 h-16 fixed top-0 z-30 '>
    <div className={`  flex  mx-auto flex-row justify-between   w-full md:w-[90%] lg:w-[80%]   px-5 md:px-0 bg-inherit`} >
    <div className="flex w-[10%] flex-row ">
      <TfiHome
        onClick={() => router.push("/")}
        size={"25px"}
        className={` focus:shadow-outline my-4 ml-5 transform cursor-pointer  transition duration-300 ease-in-out hover:scale-150 focus:outline-none`}
      />
    </div>
    <div className={`flex  flex-col w-full  md:w-[90%] md:flex-row justify-between ${isOpenMenu? "bg-neutral mt-32": "bg-inherit"} md:mt-0 md:bg-inherit px-6 md:px-0`}>
      <div className="mt-0 mr-12 flex  flex-row  items-center justify-start py-2 w-full md:w-4/5 md:flex-col">
        <div
          className={`w-full mx-auto  md:mt-0 bg-inherit flex-row md:flex justify-center  md:items-center md:gap-20 ${
            isOpenMenu ? "" : "hidden"
          } z-10    md:mt-0 md:p-0 `}
        >
          <ul className=" flex-1  items-center md:flex ">
            <li className=" flex flex-col justify-start md:flex-row hover:text-base-content">
            <Link
                  href={"/works"}
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  className= {` w-32 text-start md:text-center hover:inline-block transition ease-in-out delay-150 cursor-pointer rounded-xl  py-2 px-4 font-light no-underline hover:-translate-y-1 hover:scale-105 hover:bg-slate-100`}
                >
           How it Works
                </Link>
                <Link
                  href={"/blog"}
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  className= {` w-32 text-start md:text-center hover:inline-block transition ease-in-out delay-150 cursor-pointer rounded-xl  py-2 px-4 font-light no-underline hover:-translate-y-1 hover:scale-105 hover:bg-slate-100`}
                >
                 blog
                </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`   flex flex-col w-full md:w-1/5 bg-inherit flex-wrap md:flex  md:items-center  md:justify-end ${
          isOpenMenu ? "" : "hidden"
        } z-10" py-2 `}
      >
   

        <button
          className="btn btn-sm btn-warning   md:animate-bounce w-32"
          onClick={
            authenticated
              ? async() => {
                  await handleLogout();
                  setIsOpenMenu(!isOpenMenu);
                }
              : () => {
                  router.push("/auth");
                  setIsOpenMenu(!isOpenMenu);
                }
          }
        >
    
        
          {authenticated ? "Logout" : "    Login"}
        </button>
      </div>
    </div>
    <div className="my-4 justify-end pr-4  flex md:hidden">
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        id="nav-toggle"
        className="focus:shadow-outline flex transform items-center p-1 transition duration-300 ease-in-out hover:scale-105  focus:outline-none"
      >
        {isOpenMenu ? (
          <MdClose size={"25px"} />
        ) : (
          <MdMenu size={"25px"} />
        )}
      </button>
    </div>
    </div>
  </nav>

  )
};

export default NavbarMarketing