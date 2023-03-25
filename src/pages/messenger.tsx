import { useSession } from 'next-auth/react';
import React from 'react'
import AdminMessenger from '~/components/adminPages/AdminMessanger';
import CustomerMessenger from '~/components/customerPage/CustomerMessanger';

const Messenger = () => {
  const session = useSession();
  const userId = session.data?.user.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const role=session.data?.user.role
  return (
 <>
 {role==='customer' ? <CustomerMessenger userId={userId ?? ""}/> : role==='admin'? <AdminMessenger userId={userId ?? ""}/> : <div className=' my-32 mx-32 text-lg text-red-500'>Not Authorised</div>}
 </>
  )
}

export default Messenger