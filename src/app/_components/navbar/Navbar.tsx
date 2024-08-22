"use client"
import React, { Suspense } from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from "./Search"
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from '../Categories'

interface NavbarProps{
  currentUser?:SafeUser |null
}

const Navbar :React.FC<NavbarProps> = ({
  currentUser
}) => {
  
  return (
    <div style={{zIndex:"100"}}className='fixed w-full bg-white shadow-sm z-100'>
      <div className="py-4 border-b-[1px]">
        <Container>
           <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo/>
            <Suspense>
            <Search/>
            </Suspense>
            <UserMenu currentUser={currentUser}/>
           </div>
        </Container>
      </div>
      <Suspense>
      <Categories/>
      </Suspense>
    </div>
  )
}

export default Navbar
