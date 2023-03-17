import { MdMenu, MdOutlineMarkChatUnread } from "react-icons/md";

import React from "react";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
export interface NavProps {
  activeMenu?: boolean;
  handleMenu: () => void;
}

const Nav = ({ activeMenu, handleMenu }: NavProps) => {
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
      

        <div className="dropdown dropdown-bottom dropdown-end  ">
        <label tabIndex={0} >  <div className="tooltip tooltip-bottom" data-tip="Messages">
          <MdOutlineMarkChatUnread className="h-8 w-8 cursor-pointer text-primary" />
        </div></label>
        <ul tabIndex={0} className="menu card dropdown-content p-2 shadow bg-base-100 rounded-box w-72 md:w-96 mt-4">
          <div className="card-body">
       <li > <a className="flex flex-row gap-6">
        <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <Image
                      src="/profile.jpg"
                      width={"48"}
                      height="48"
                      alt="profile pic"
                    />
                  </div>
                </div>  
                  <div className="flex flex-col">
                  <p className="text-xl">
                    <strong>Cy Ganderton</strong>
                  </p>{" "}
                  <p>You have a new Message!</p>
                  </div>
                </a></li>
                <li> <a className="flex flex-row gap-6">
        <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <Image
                      src="/profile.jpg"
                      width={"48"}
                      height="48"
                      alt="profile pic"
                    />
                  </div>
                </div>  
                  <div className="flex flex-col">
                  <p className="text-xl">
                    <strong>Cy Ganderton</strong>
                  </p>{" "}
                  <p>You have a new Message!</p>
                  </div>
                </a></li>
                <li> <a className="flex flex-row gap-6">
        <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <Image
                      src="/profile.jpg"
                      width={"48"}
                      height="48"
                      alt="profile pic"
                    />
                  </div>
                </div>  
                  <div className="flex flex-col">
                  <p className="text-xl">
                    <strong>Cy Ganderton</strong>
                  </p>{" "}
                  <p>You have a new Message!</p>
                  </div>
                </a></li>
                <li> <a className="flex flex-row gap-6">
        <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <Image
                      src="/profile.jpg"
                      width={"48"}
                      height="48"
                      alt="profile pic"
                    />
                  </div>
                </div>  
                  <div className="flex flex-col">
                  <p className="text-xl">
                    <strong>Cy Ganderton</strong>
                  </p>{" "}
                  <p>You have a new Message!</p>
                  </div>
                </a></li>
                <li><button className="btn btn-primary w-full text-primary-content">See all messages</button></li>
                </div>
        </ul>
      </div>

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
                    <strong>Michale Roberts</strong>
                  </p>
                  <p>Customer</p>
                  <p>michaelberts@gmail.com</p>
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
                <button className="btn btn-warning w-full">Logout</button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
