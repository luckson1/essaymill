import React from 'react'
import Order from '~/components/forms/orderForm'
import { api } from '~/utils/api'

const order = () => {
    const {data:subjects}=api.subject.getall.useQuery()

  return (
   <>
   <Order subjects={subjects} />
   </>
  )
}

export default order