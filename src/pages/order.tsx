import type { Project } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import OrderForm from '~/components/forms/orderForm'
import Payments from '~/components/payments'
import { api } from '~/utils/api'

const Order = () => {
    const {data:subjects}=api.subject.getall.useQuery()
    const [isShowForm, setIsShowForm]=useState(true)
    const[price, setPrice]=useState(10)
    const[email, setEmail]=useState("")
    const[project, setProject]=useState<Project | undefined>()
    const session=useSession()

    const authorised=session.status==="authenticated"

  return (
   <div className='my-16 flex justify-center items-center w-full'>
{  isShowForm && <OrderForm subjects={subjects} price={price} setPrice={setPrice} setProject={setProject} setEmail={setEmail} setIsShowForm={setIsShowForm} authorised={authorised}/>}
{ !isShowForm &&  <div className='m-10'><Payments price={price} project={project} email={email} authorised={authorised}/></div>}
   </div>
  )
}

export default Order