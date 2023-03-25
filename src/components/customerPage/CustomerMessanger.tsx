
import Image from "next/image";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsSendCheck } from "react-icons/bs";
import MessagesUser from "~/components/customerPage/MessagesUser";
import { api } from "~/utils/api";
import Skeleton from "../loadingState/Skeleton";



const CustomerMessenger = ({userId}: {userId:string}) => {

  const [projectId, setProjectId] = useState<string>();
  const [value, setValue] = useState<string>("");
  const{data}=api.project.getUserUnreadMessages.useQuery()
  const [isContent, setIsContent] = useState(false);

  const {mutate:getOrderNumber, isLoading, isError}=api.project.getUserProjectId.useMutation({
    onSuccess(data) {
        setProjectId(data.id)
    }
})
  return (
    <div className="flex h-fit w-full flex-row  md:px-10 card my-24 ">
      <div
        className={` ${
          isContent ? "hidden w-0 md:flex" : "mr-5 w-full md:mr-0"
        } card static h-full min-h-[calc(100vh-4rem)] rounded-xl bg-base-200 lg:w-4/12`}
      >
          <div className="card-body">
    
    
    {  data?.unreadMsgs && data.unreadMsgs.map(message=> (
      <a className="flex flex-row gap-6" key={message.id}  onClick={()=> setProjectId(message.projectId)}>
      <div className="avatar">
                <div className="w-12 rounded-full ">
                  <Image
              src={message.creator.image ?? "/profile.jpg"}
                    width={"24"}
                    height="24"
                    alt="profile pic"
                  />
                </div>
              </div>  
                <div className="flex flex-col">  
                <p className="text-xl">
                  <strong>{message.creator.name}</strong>
                </p>{" "}
                <p className='h-fit max-h-16 text-xs'>{message.body}</p>
                </div>
              </a>
    )) }

{data?.numberOfMessages===0 && <form  className="w-full h-fit flex flex-col gap-3 justify-center items-center" onSubmit={(e)=> {e.preventDefault(); getOrderNumber({orderNumber: +value}); setValue(""); setProjectId(undefined)}}>
            <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Search Messages by order Number</span>
 
  </label>
  <input type="text" value={value} placeholder="Type order number" className="input input-bordered w-full max-w-xs"  onChange={(e)=>setValue(e.target.value) }/>
  

</div>
<button className="btn w-full" role={"submit"}>
        {" "}
        <BsSendCheck className="h-8 w-8 text-green-400" />
      </button>
                
                
                
                </  form >}    
          
                
           
                </div>
      </div>
      <div
        className={`${
          isContent ? "mr-5 w-full md:mr-0" : "w-0"
        }  card static h-fit min-h-[calc(100vh-4rem)] lg:w-8/12`}
      >
        <div className="card-body">
          <button
            className=" btn-secondary btn-sm btn  w-32 gap-3 md:hidden"
            onClick={() => setIsContent(false)}
          >
            {" "}
            <BiArrowBack className="h-6 w-6" /> Back
          </button>
          {isLoading && <div className="w-full h-full"> <Skeleton /></   div >}
        {isError && <div className="text-red-500 text-center"> Sorry, There is No such Order</ div >}
        
{  projectId &&  <MessagesUser projectId={projectId} userId={userId ?? ""}/> }
        </div>
      </div>
    </div>
  );
};

export default CustomerMessenger;
