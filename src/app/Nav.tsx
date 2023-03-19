'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import NavbarMarketing from './NavBarMarketing'


const Nav = () => {
  return (
<SessionProvider>
< NavbarMarketing/>
</SessionProvider>
  )
}

export default Nav