'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Navbar from './Navbar'

const Nav = () => {
  return (
<SessionProvider>
<Navbar />
</SessionProvider>
  )
}

export default Nav