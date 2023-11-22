'use client'
import { ArrowRight } from "lucide-react"
import { trpc } from "../_trpc/client"

function UpgradeButton() {
  const { mutate : createStipeSession} = trpc.createStripeSession.useMutation({
    onSuccess : ({url}) => {
      window.location.href = url ?? "/dashboard/billing"
    }
  })
  return (
    <button onClick={() => createStipeSession()} className='flex mx-auto mt-2 font-semibold bg-blue-700 hover:bg-blue-500 text-white py-2 rounded-lg px-36'>
      Upgrade Now <ArrowRight className="h-5 w-5 ml-1.5 mt-1"/>
    </button>
  )
}

export default UpgradeButton
