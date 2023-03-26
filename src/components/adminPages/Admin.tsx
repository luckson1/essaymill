import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, {useCallback } from "react";
import { z } from "zod";
import { api } from "~/utils/api";
import Skeleton from "../loadingState/Skeleton";
const statusSchema = z.enum([
  "draft",
  "progress",
  "revision",
  "review",
  "complete",
  "closed",
  "cancelled",
]);

export type Status = z.infer<typeof statusSchema>;
const Admin = ({ status }: { status: Status }) => {
  const { data: projects, isLoading } =
    api.project.getAllProjectsByStatus.useQuery({ status }, {});
  const router = useRouter();
  // determining the remaining time

  const time = useCallback((deadline: string) => {
    const today = moment();

    const due = moment(deadline);
    const days = due.diff(today, "days");
    const hours = due.diff(today, "hours") % 24;
    const timeString=`${days} days, ${hours} hours`;
    const isUrgent= days<=0 && hours<12 ? true: false
    
    return {timeString, isLate: isUrgent}
  }, []);
  const [animationParent] = useAutoAnimate();

  return (
    <div className="my-24 flex h-fit w-full flex-col items-center justify-center gap-8" ref={animationParent}>
 {isLoading && <Skeleton />}
       {!isLoading && 
       <>
       <div className="overflow-x-auto">
          <table className="static table w-full max-w-4xl">
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
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.map((p) => (
                  <tr
                    className="hover cursor-pointer"
                    key={p.id}
                    onClick={() => router.push(`/project/${p.id}?id=${p.id}`)}
                  >
                    <td>{p.orderNumber}</td>
                    <td>{p.user.name}</td>
                    <td>{p.subject.name}</td>
                    <td>{p.typeOfPaper}</td>
                    <td>{p.pages}</td>
                    <td>{p.status}</td>
                    <td className={`${time(p.deadline).isLate? "text-red-500": ""}`}>{time(p.deadline).timeString}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary">«</button>
          <button className="btn btn-primary">Page 1</button>
          <button className="btn btn-primary">»</button>
        </div>
        </>
    }
    </div>
  );
};

export default Admin;
