import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { BsSendCheck } from 'react-icons/bs';
import { api } from '~/utils/api';
import Skeleton from '../loadingState/Skeleton';

const MessagesUser = ({projectId, userId}: {projectId: string, userId: string}) => {
    const [value, setValue] = useState("");
    
     
      
      
      const { data: messages, isLoading } = api.message.getMessages.useQuery({ projectId });
      const ctx = api.useContext();
      const { mutate: addMessage } = api.message.addMessage.useMutation({
        onSuccess: async () => {
          await ctx.message.getMessages.invalidate();
        },
      });

      //
    //mark messages as read
    const{mutate:markRead}=api.message.markAsRead.useMutation({
    
    })

    const{data:unreadMessages}=api.project.getUserUnreadMessages.useQuery(undefined, {refetchInterval: 10000})
    useEffect(()=> {
if(unreadMessages && unreadMessages?.length>0) {
unreadMessages.forEach(message=> markRead({projectId:message.projectId, creatorId:message.creator.id}))
}
    }, [unreadMessages, markRead])
    if (isLoading) return ( <div className="card-body mx-auto w-full max-w-5xl md:p-12"><Skeleton /></div>)
      
  return (
    <div className="card-body mx-auto w-full max-w-5xl md:p-12">
    {messages &&
      messages.map((m) => (
        <div
          className={`chat ${
            m.userId === userId ? "chat-end" : "chat-start"
          } `}
          key={m.id}
        >
          <div className="chat-header">
            {m.creator.name}{" "}
            <time className="text-xs opacity-50">
              {moment(m.createdAt).toString()}
            </time>
          </div>
          <div
            className={`chat-bubble ${
              m.userId === userId
                ? "chat-bubble-secondary"
                : "chat-bubble-neutral"
            } static`}
          >
            {m.body}
          </div>
          <div className="chat-footer opacity-50">{m.isRead? "Seen": "Delivered"}</div>
        </div>
      ))}
    <form
      className="flex w-full flex-row items-center justify-center gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        addMessage({ projectId, body: value });
        setValue("");
      }}
    >
      <div className="form-control w-full max-w-3xl">
        <label className="label">
          <span className="label-text">Write a message</span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24"
          placeholder="Write here....."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <label className="label"></label>
      </div>
      <button className="btn" role={"submit"}>
        {" "}
        <BsSendCheck className="h-8 w-8 text-green-400" />
      </button>
    </form>
  </div>
  )
}

export default MessagesUser