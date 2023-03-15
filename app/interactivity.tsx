
'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import React, { useState } from 'react'
import Order from 'app/orderForm'
import Landing from './Landing'
import { type Subject } from '@prisma/client'

const Interactivity = ({subjects}:{subjects: Subject[]}) => {
    const [isShowForm, setIsShowForm]=useState(false)
const [animationParent] = useAutoAnimate()
  return (
    <div className='flex flex-col w-full h-fit justify-center items-center'  ref={animationParent}>
      {!isShowForm && <div className="flex flex-col justify-around items-center md:flex-row w-[88%]  h-fit">
<div className="w-full md:w-2/3 flex flex-col gap-5 md:gap-10 md:mt-16 ">
  
  <p className="text-3xl md:text-6xl text-base-100">ORIGINAL ACADEMIC
WRITING ON DEMAND</p>
<p className="text-xl italic text-base-100">Any Subject. Brilliant Writers. No AI or Plagiarism.</p>
  <button className="btn btn-accent w-full max-w-xs relative" onClick={()=> setIsShowForm(true)}>Order</button></div>
     <Landing />
 </div>}

      {isShowForm && <Order subjects={subjects} setIsShowForm={setIsShowForm} />}
    </div>
  )
}

export default Interactivity