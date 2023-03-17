import React from 'react'

const revision = () => {
  return (
    <div className='w-full h-fit my-12 flex flex-col items-center gap-8 justify-center'>
    <div className="overflow-x-auto">
      <table className="table static w-full  max-w-4xl">
        {/* head */}
        <thead>
             <tr className="hover">
            <th>Order Number</th>
            <th> Customer Name</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Pages</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
             <tr className="hover">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Accounting</td>
            <td>Essay</td>
            <td>5</td>
            <td>In Progress</td>
            <td>March 14, 2023</td>
            <td>1 day 3 hours</td>
          </tr>
          {/* row 2 */}
          <tr className="hover">
            <th>2</th>
            <td>Cy Ganderton</td>
            <td>Accounting</td>
            <td>Essay</td>
            <td>5</td>
            <td>In Progress</td>
            <td>March 14, 2023</td>
            <td>1 day 3 hours</td>
          </tr>
          {/* row 3 */}
             <tr className="hover">
            <th>3</th>
            <td>Cy Ganderton</td>
            <td>Accounting</td>
            <td>Essay</td>
            <td>5</td>
            <td>In Progress</td>
            <td>March 14, 2023</td>
            <td>1 day 3 hours</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="btn-group">
      <button className="btn btn-primary">«</button>
      <button className="btn btn-primary">Page 22</button>
      <button className="btn btn-primary">»</button>
    </div>
        </div>
  )
}

export default revision 