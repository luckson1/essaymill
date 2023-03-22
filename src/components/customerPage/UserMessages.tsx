

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { MdOutlineMarkChatUnread } from 'react-icons/md'
import { api } from '~/utils/api'

const UserMessages = () => {
  const[ messagesNumber, setMessagesNumber]=useState(0)
  //unread messages
  const{data:messages}=api.project.getUserUnreadMessages.useQuery(undefined, { onSuccess(messages) {
      setMessagesNumber(messages.length)
  }, refetchInterval: 10000, refetchIntervalInBackground:true})

const router=useRouter()
const session = useSession();
  return (
    <div className="dropdown dropdown-bottom dropdown-end  ">
    <label tabIndex={0} >  <div className="tooltip tooltip-bottom" data-tip="Messages">
      <div className='flex flex-row gap-0'><MdOutlineMarkChatUnread className="h-8 w-8 cursor-pointer text-primary" /> {messages && messages?.length >0 && <p className='text-red-500 text-xs font-extrabold animate-bounce'>{messagesNumber}</p>}</div>
    </div></label>
    <ul tabIndex={0} className="menu card dropdown-content p-2 shadow bg-base-100 rounded-box w-72 md:w-96 mt-4">
      <div className="card-body">
   <li > 
    
{  messages && messages.map(message=> (
  <a className="flex flex-row gap-6" key={message.id}>
  <div className="avatar">
            <div className="w-12 rounded-full ">
              <Image
          src={message.creator.image ?? "/profile.jpg"}
                width={"48"}
                height="48"
                alt="profile pic"
              />
            </div>
          </div>  
            <div className="flex flex-col"onClick={()=>router.push(`/project/${message.projectId}?id=${message.projectId}`)}>  
            <p className="text-xl">
              <strong>{message.creator.name}</strong>
            </p>{" "}
            <p className='h-fit max-h-16 text-xs'>{message.body}</p>
            </div>
          </a>
)) }
            
            </li>
            <li><button className="btn btn-primary w-full text-primary-content">See all messages</button></li>
            </div>
    </ul>
  </div>
  )
}

export default UserMessages