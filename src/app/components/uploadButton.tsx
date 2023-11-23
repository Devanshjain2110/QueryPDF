'use client'

import { useState } from "react"

import UploadArea from "./uploadArea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
function UploadButton({isSubscribed,} : {isSubscribed : boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
 
   
  return (
//   
<Dialog
open={isOpen}
onOpenChange={(v) => {
  if (!v) {
    setIsOpen(v)
  }
}}>
<DialogTrigger
  onClick={() => setIsOpen(true)}
  asChild>
 <button className="px-4 py-2 rounded-lg font-semibold bg-blue-700 border-none hover:bg-blue-500 text-white" >Upload PDF</button>
</DialogTrigger>

<DialogContent>
  <UploadArea isSubscribed={isSubscribed}/>
</DialogContent>
</Dialog>

  )
}

export default UploadButton
