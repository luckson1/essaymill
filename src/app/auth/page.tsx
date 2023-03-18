
'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { LoginCard } from '~/components/LoginCard'

const Auth = () => {
  return (

    <SessionProvider>
<LoginCard/>
</SessionProvider> 

  )
}

export default Auth