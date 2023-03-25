/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from 'next-auth/react'
import React from 'react'
import AdminDashboard from '~/components/adminPages/AdminDashboard'
import CustomerDashboard from '~/components/customerPage/CustomerDashboard'
import Skeleton from '~/components/loadingState/Skeleton'

const Dashboard = () => {
  const session=useSession()
  const status=session.status
  const isLoading=status==="loading"

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const role=session.data?.user.role
  const admin=role==="admin"
  const customer=role==="customer"
  if(isLoading)return( <div className='w-full h-[40vh]'><Skeleton/></div>)
  return (
<>
{admin? <AdminDashboard /> : customer? <CustomerDashboard  /> : <div className='my-32 mx-32 text-red-500'>Not Authorised</div>}
</>
  )
}

export default  Dashboard