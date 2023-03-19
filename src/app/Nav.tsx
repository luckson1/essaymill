'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Navbar from './NavBar'


const Nav = () => {
  return (
<SessionProvider>
<Navbar />
</SessionProvider>
  )
}

export default Nav