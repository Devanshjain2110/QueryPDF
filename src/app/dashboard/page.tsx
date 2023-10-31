import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

function Dashboard() {
    const {getUser} = getKindeServerSession();
    const user = getUser()

    if( !user ||  !user.id) redirect('/auth-callback?origin=dashboard')
  return (
    <div>
      {user.email}
    </div>
  )
}

export default Dashboard
