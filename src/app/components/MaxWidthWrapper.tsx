import { cn } from "@/lib/utils"
import { ReactNode } from "react"


function MaxWidthWrapper({children, className} : {className?: string, children : ReactNode})  {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-[1.25rem] text-center", className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
