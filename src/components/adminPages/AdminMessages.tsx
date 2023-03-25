

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineMarkChatUnread } from 'react-icons/md'
import { api } from '~/utils/api'

const AdminMessages = () => {

  const[ messagesNumber, setMessagesNumber]=useState(0)
  //unread messages
  const{data}=api.project.getAllUnreadMessages.useQuery(undefined, { onSuccess(data) {
      setMessagesNumber(data?.numberOfMessages)
  }, refetchInterval: 10000, refetchIntervalInBackground:true})

const router=useRouter()

  return (
   
      <div className="tooltip tooltip-bottom" data-tip="Messages">
      <div className='flex flex-row gap-0' onClick={()=> router.push("/messenger")}><MdOutlineMarkChatUnread className="h-8 w-8 cursor-pointer text-primary" /> {data?.unreadMsgs && data.unreadMsgs?.length >0 && <p className='text-red-500 text-xs font-extrabold animate-bounce'>{messagesNumber}</p>}</div>
    </div>

  )
}

export default AdminMessages