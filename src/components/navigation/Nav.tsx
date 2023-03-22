import { MdMenu, MdOutlineMarkChatUnread } from "react-icons/md";

import React, { useCallback } from "react";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { BiCartAdd } from "react-icons/bi";
import { useRouter } from "next/navigation";
import UserMessages from "../customerPage/UserMessages";
import AdminMessages from "../adminPages/AdminMessages";
export interface NavProps {
  activeMenu?: boolean;
  handleMenu: () => void;
}

const Nav = ({ activeMenu, handleMenu }: NavProps) => {
  const handleLogout = useCallback(async() => {
    await signOut();
  }, []);
const session=useSession()
      // tslint:disable-next-line (for vercel build)
const role=session.data?.user.role
const router=useRouter()

  return (
    <nav
      className={`full fixed top-0   z-30 flex  h-16 w-full flex-row items-center justify-between   ${
        activeMenu ? " pr-80 " : "px-10"
      }`}
    >
      <button
        onClick={() => handleMenu()}
        className="focus:shadow-outline  flex transform items-center p-1 transition duration-300 ease-in-out hover:scale-105 hover:text-secondary focus:outline-none"
      >
        {activeMenu ? (
          <div className="tooltip tooltip-right" data-tip="close sideBar">
            <AiOutlineCloseCircle size={"25px"} />{" "}
          </div>
        ) : (
          <div className="tooltip tooltip-right" data-tip="open sideBar">
            <MdMenu size={"25px"} />{" "}
          </div>
        )}
      </button>

      <div className="mx-10 flex flex-row items-center justify-center gap-10 md:gap-20">
      <button className="btn btn-sm btn-primary gap-3" onClick={()=> router.push("/order")}> <BiCartAdd className="h-6 w-6"/>Order</button>

     {  role==="customer" ? <UserMessages /> : role==="admin"? <AdminMessages /> : <div>!</div>}

        <div className="dropdown-bottom dropdown-end dropdown">
          <label tabIndex={0}>
            <div className="tooltip tooltip-bottom" data-tip="profile">
              <div className="avatar">
                <div className="w-8 cursor-pointer rounded-full">
                  <Image
                    src="/profile.jpg"
                    width={"32"}
                    height="32"
                    alt="profile pic"
                  />
                </div>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="card dropdown-content menu rounded-box card-compact z-[1000] mt-4 w-80 Md:w-96 bg-base-100 p-2 shadow"
          >
            <div className="card-body">
              <div className="flex w-full flex-row gap-6">
                <div className="avatar">
                  <div className="w-16 rounded-full ">
                    <Image
                      src="/profile.jpg"
                      width={"64"}
                      height="64"
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl">
                    <strong>{session.data?.user.name ?? "User"}</strong>
                  </p>
                  <p>Customer</p>
                  <p>{session.data?.user.email ?? "uknown"}</p>
                </div>
              </div>
              <li>
                <a className="flex flex-row gap-6">
                  <MdOutlineMarkChatUnread className="w-10 h-10 text-primary"/>
                  <div className="flex flex-col">
                  <p className="text-xl">
                    <strong>My Inbox</strong>
                  </p>{" "}
                  <p>Messages</p>
                  </div>
                </a>
              </li>
              <li>
                      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <button className="btn btn-warning w-full" onClick={handleLogout}>Logout</button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
