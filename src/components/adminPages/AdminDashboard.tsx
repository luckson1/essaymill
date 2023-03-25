import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";
import { useRouter } from "next/navigation";
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
const CustomerDashboard = () => {
  const { data: projects, isLoading } =
    api.project.getAllProjects.useQuery();
  const router = useRouter();
  // determining the remaining time



  const [animationParent] = useAutoAnimate();
  return (
    <div className="mt-10 flex h-fit w-full flex-col items-center justify-center gap-8" ref={animationParent} >
    {isLoading && <Skeleton />}
     { !isLoading && <>
       <div className="overflow-x-auto">
          <table className="static table w-full max-w-4xl">
            {/* head */}
            <thead>
              <tr className="hover">
                <th>Order Number</th>
             

                <th>Pages</th>
                <th>Price</th>
                <th>Status</th>
                <th>Deadline</th>
<th>Created At</th>
               
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
                
        
                    <td>{p.pages}</td>
                    {p.Payment.at(0)?<td> p.Payment.at(0)?.amount.toString()</td>:<td>Not Paid</td> }
                    <td>{p.status}</td>
                    <td>{moment(p.deadline).format('DD/MM/YY')}</td>
                    <td>{moment(p.createdAt).format('DD/MM/YY')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary">«</button>
          <button className="btn btn-primary">Page 22</button>
          <button className="btn btn-primary">»</button>
        </div>
       </>
}
    </div>
  );
};

export default CustomerDashboard;
