


import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Project } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, {useCallback, useState } from "react";
import { z } from "zod";
import Skeleton from "~/components/loadingState/Skeleton";
import Payments from "~/components/payments";
import { api } from "~/utils/api";
const statusSchema=z.enum([ "draft",
"progress",
  "revision",
  "review",
  "complete",
  "closed",
  "cancelled"])

export type Status= z.infer<typeof statusSchema>
const Customers = ({status}:{status: Status}) => {
 const [isPayments, setIsPayments]=useState(false)
 const[project, setProject]=useState<Project>()
  const { data:projects, isLoading } = api.project.getUserProjectsByStatus.useQuery({status}, {

  });
const ctx=api.useContext()
  const{mutate:requestRevision}=api.project.updateProjectStatus.useMutation({
    onSuccess: async()=> {
      await ctx.project.getUserProjectsByStatus.invalidate()
    }
  })
  const router=useRouter()
    // determining the remaining time

    const time = useCallback((deadline:string) => {
   
      const today = moment();

      const due = moment(deadline)
      const days=due.diff(today, "days")
      const hours = due.diff(today, "hours") %24;
      return `${days} days, ${hours} hours`
    }, []);

    const calculatePrice= useCallback((project:Project)=> {
 // set price based on deadline, academic Level and number of pages
 const today = moment();
 const due = moment(project.deadline) 
 const time = due.diff(today, "days");
 const academicLevelMultiplier =
 project.academicLevel === "graduate" ? 1.2 : project.academicLevel === "phd" ? 1.5 : 1;

const deadlineMultiplier =
 time <= 1 ? 1.5 : time <= 3 && time > 1 ? 1.2 : 1;
const pagesMultiplier = project.pages;


 const price=10 * pagesMultiplier * academicLevelMultiplier * deadlineMultiplier
 return price
  }, [])
  const [animationParent] = useAutoAnimate();
  return (
    <div className="mt-10 flex h-fit w-full flex-col items-center justify-center gap-8" ref={animationParent} >
   {isLoading && <Skeleton />}
   {!isPayments && !isLoading && !projects && <div>No Projects Found</div>}
   {!isPayments && !isLoading && projects && projects?.length<=0 && <div>No Projects Found</div>}
       {!isPayments && !isLoading && projects && projects?.length>0 &&<div className="overflow-x-auto">
          <table className=" table w-full max-w-4xl z-0">
            {/* head */}
            <thead>
              <tr className="hover">
                <th>Order Number</th>
                <th> Customer Name</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Pages</th>
                <th>Status</th>

                <th>Time Remaining</th>
                {   status==="draft" &&   <th>Action</th>}
                {   status==="complete" &&   <th>Action</th>}
              </tr>
            </thead>
            <tbody>
       
             { projects && projects.map(p=> (
              
                   <tr className="hover cursor-pointer" key={p.id} onClick={()=>router.push(`/project/${p.id}?id=${p.id}`)}>                 
               <td>{p.orderNumber}</td>
                   <td>{p.user.name}</td>
                   <td>{p.subject.name}</td>
                   <td>{p.typeOfPaper}</td>
                   <td>{p.pages}</td>
                   <td>{p.status}</td>
                   <td>{time(p.deadline)}</td>
             {   status==="draft"  && <td><button className="btn btn-sm capitalize" onClick={(e)=> {e.stopPropagation();setProject(p); setIsPayments(true)}}>Pay</button></td>}
             {   status==="complete"  && <td><button className="btn btn-sm capitalize" onClick={(e)=> {e.stopPropagation(); requestRevision({status: "revision", id:p.id})}}>Request Revision</button></td>}
              
                 </tr>
                 
             ))
             
        
              }
            </tbody>
          </table>
        </div>}
        { isPayments && project && <Payments project={project} authorised={true} price={calculatePrice(project)}/>}
        <div className="btn-group">
          <button className="btn-primary btn">«</button>
          <button className="btn-primary btn">Page 22</button>
          <button className="btn-primary btn">»</button>
        </div>
   
    </div>
  );
};

export default Customers;
