import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import Dashboard from '../components/dashboard';
import { getUserSubscriptionPlan } from '@/lib/stripe';

 async function Page() {
    const {getUser} = getKindeServerSession();
    const user = getUser()

    if( !user ||  !user.id) redirect('/auth-callback?origin=dashboard')

    const dbUser  =  await db.user.findFirst({
      where : {
        id : user.id 
      }
    })

    if(!dbUser) redirect('/auth-callback?origin=dashboard')
    const subscriptionPlan = await getUserSubscriptionPlan()
  console.log(subscriptionPlan)
  return (
   <Dashboard subscriptionPlan={subscriptionPlan}/>
  )
}

export default Page
