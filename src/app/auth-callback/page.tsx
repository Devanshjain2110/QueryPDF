import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function AuthCall() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    
  return (
    <div>
      
    </div>
  )
}

export default AuthCall
