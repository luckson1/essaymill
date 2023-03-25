import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GiScrollUnfurled } from 'react-icons/gi';
import { BiMessageRoundedDetail} from 'react-icons/bi';
import { AiOutlineFileDone, AiOutlineHome } from 'react-icons/ai'
import { RiDraftLine } from 'react-icons/ri'
import {GrInProgress} from 'react-icons/gr'
import type { NavProps } from './Nav';
export const SideBar = ({handleMenu}: NavProps) => {


    const links = [
        {
          title: "Dashboard",
          links: [
            {
              name: "Home",
              icon: AiOutlineHome,
              path: "/home"
            },
          ],
        },
      
        {
          title: "Orders",
          links: [
            {
              name: "Drafts",
              icon:RiDraftLine,
              path: "/drafts"
            },
            {
              name: "In Progress",
              icon: GrInProgress,
              path: "/progress"
            },
            {
              name: "On Revision",
              icon: AiOutlineFileDone,
              path: "/revision"
            },
            {
              name: "Done",
              icon: AiOutlineFileDone,
              path: "/done"
            },
      
            
          ],
        },
        {
          title: "Account",
          links: [
            {
              name: "Messenger",
              icon: BiMessageRoundedDetail,
              path: "/messenger"
            },
          ],
        },
      ];


    const router=useRouter()
   
    const activeLink= `flex items-center gap-5 pl-3 pt-2 pb-2   bg-primary text-primary-content`
    const normalLink= "flex items-center gap-5 pl-3 pt-2 pb-2   hover:bg-base-300  "
    return (
        <div className='ml-3 h-screen
        md:overflow-hidden 
        overflow-auto 
        md:hover:overflow-auto 
        pb-10'>
            { ( <> <div className='flex flex-row items-center justify-center'>
                <Link href="/home" 
             
                className="items-center
                 gap-5 flex-row w-full ml-3 mt-4 flex text-xl font-bold
                 tracking-tight text-base-content ">
                <GiScrollUnfurled /> <span>EssaysDoctor</span>
                </Link>
 
                    <button type="button" className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden' 
                      onClick={ ()=>handleMenu()}
                    >
                        <MdOutlineCancel />
                    </button>
        
            </div>
            <div className='mt-10'>
{links?.map((item)=> (
    <div key={item?.title} className='menu p-0 px-4 text-base-content'>
        <p className="  mt-4 uppercase menu-title" >
        { item?.title}
        </p>
   <ul>
   {item?.links?.map((link, index)=> (
<li key={index} className='mt-1 mb-1'>
            <Link 
        
            href= {`${link?.path}`}
       

            className={router.pathname===`${link?.path}` ? activeLink: normalLink} 
            >
< link.icon  className='text-lg'/>
<span className='capitalize'>
{link?.name}
</span>

            </Link>
            </li>
        ))}
   </ul>
       
    </div>
))}
            </div>
            </>)}

        </div>
    );
};