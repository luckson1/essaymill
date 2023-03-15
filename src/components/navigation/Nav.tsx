import { MdClose, MdMenu } from "react-icons/md";

import React from 'react'
export interface NavProps {
    activeMenu?: boolean;
    handleMenu: () => void;
  }

const Nav = ({activeMenu, handleMenu}: NavProps) => {

    
      
   
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
        <div className="tooltip tooltip-right" data-tip="Close SideBar">
          <MdClose size={"25px"} />{" "}
        </div>
      ) : (
        <div className="tooltip tooltip-right" data-tip="Open SideBar">
          <MdMenu size={"25px"} />{" "}
        </div>
      )}
    </button>
    
    <button
      className="btn-outline btn-warning btn-sm btn"
    
    >
    Logout
    </button>
    </nav>
  )
}

export default Nav