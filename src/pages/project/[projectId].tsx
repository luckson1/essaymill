import { Skeleton } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'
import ProjectAdmin from '~/components/adminPages/Project'
import ProjectCustomer from '~/components/customerPage/Project'


const Index = () => {
  const session=useSession()
  const status=session.status
  const isLoading=status==="loading"
  const role=session.data?.user.role
  const admin=role==="admin"
  const customer=role==="customer"
  if(isLoading)return( <div className='w-full h-[40vh]'><Skeleton/></div>)
  return (
<>
{admin? <ProjectAdmin/> : customer?<ProjectCustomer/> : <div className='my-32 mx-32 text-red-500'>Anuthorised</div>}
</>
  )
}
 
export default Index