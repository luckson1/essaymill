
import { useSession } from 'next-auth/react'
import React from 'react'
import Admin from '~/components/adminPages/Admin'
import Customers from '~/components/customerPage/Customer'
import Skeleton from '~/components/loadingState/Skeleton'

const Index = () => {
  const session=useSession()
  const status=session.status
  const isLoading=status==="loading"
        // tslint:disable-next-line (for vercel build)
  const role=session.data?.user.role
  const admin=role==="admin"
  const customer=role==="customer"
  if(isLoading)return( <div className='w-full h-[40vh]'><Skeleton/></div>)
  return (
<>
{admin? <Admin status='complete' /> : customer? <Customers status='complete' /> : <div className='my-32 mx-32 text-red-500'>Anuthorised</div>}
</>
  )
}

export default Index