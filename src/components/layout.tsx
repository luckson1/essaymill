
import React, { type ReactNode, useCallback, useEffect, useState } from 'react'
import { SideBar } from './navigation/Sidebar';
import Nav from './navigation/Nav';
import { usePathname } from 'next/navigation';
import Navbar from './navigation/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Skeleton from './loadingState/Skeleton';



const Layout = ({children}:{children:ReactNode}) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const handleMenu = useCallback(() => {
      setActiveMenu((prevMenu) => !prevMenu);
    }, []);
    const [screenSize, setScreenSize] = useState<number>(1000);
   
  
    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      if (screenSize <= 768) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);

    const path= usePathname()
    const session=useSession()
    const router= useRouter()
    const status=session.status
    const isauthenticated=status === 'authenticated'
    const isUnAutheniticated= status==="unauthenticated"
    const isLoading= status==="loading"



    if (path==="/order") return (

      <div className="drawer-mobile drawer  relative flex flex-row h-fit bg-base-100 font-light ">
 

      <div
        className={`  min-h-screen w-full " flex-2 mx-4"
        }`}
      >
        <div className="fixed  w-full">
          <Navbar/>
        </div>

        <main className="drawer-content mt-20 bg-base-100 ">
          {children}
        </main>
      
    
      </div>
    </div>
    )
    if(isLoading) return (<div className='h-screen w-screen'><Skeleton /></div>)
    if(isUnAutheniticated) router.push("/")
  return (
    <>
   
{    isauthenticated &&  <div className="drawer-mobile drawer  relative flex flex-row h-fit bg-base-100 font-light ">
        {activeMenu ? (
          <div className="drawer-side fixed  z-[100] w-72 bg-base-200 bg-opacity-100">
            <SideBar handleMenu={handleMenu} />
          </div>
        ) : (
          <div className="drawer-side fixed  z-[100] w-0">
            <SideBar handleMenu={handleMenu} />
          </div>
        )}
  
        <div
          className={`  min-h-screen w-full ${
            activeMenu ? "ml-72" : " flex-2 mx-4"
          }`}
        >
          <div className="fixed  w-full">
            <Nav activeMenu={activeMenu} handleMenu={handleMenu} />
          </div>

          <main className="drawer-content mt-16 bg-base-100 ">
            {children}
          </main>
        
      
        </div>
      </div>}
   
  </>
  )
}

export default Layout