import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import {LoginLink, RegisterLink, getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
import { BsArrowRight } from 'react-icons/bs'
import UserAccountNav from './UserAccountNav'
import MobileNav from './mobileNav'

function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  return (
    <nav className='sticky h-14 inset-x-0 z-30 border border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b  border-zinc-100'>
            <Link href={'/'} className='flex z-40 font-semibold'>
                <span>QueryPDF.</span>
            </Link>

            <MobileNav isAuth={!!user}/>
            <div className="items-center hidden space-x-4 sm:flex">
              {!user ?  <>
                <Link href={'/pricing'} className='font-medium hover:bg-zinc-100 px-2 py-1 rounded-lg'>Pricing</Link>
                <LoginLink className='font-medium hover:bg-zinc-100 px-2 py-1 rounded-lg'>Sign In</LoginLink>
                <RegisterLink className='font-medium flex bg-blue-700  text-white hover:bg-blue-500 px-3 py-2 rounded-lg'>Get Started <BsArrowRight className='mt-[5px] ml-2'></BsArrowRight></RegisterLink>
                </> :
                <>
  <Link href={'/dashboard'} className='font-medium hover:bg-zinc-100 px-2 py-1 rounded-lg'>Dashboard</Link>
               <UserAccountNav name={
                !user.given_name   || !user.family_name ? "Your Account" : `${user.given_name} ${user.family_name}`
               }
               email={user.email ?? ''}
               imageUrl={user.picture ?? ''} />
                </>}
            </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
