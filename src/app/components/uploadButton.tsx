'use client'

import { useState } from "react"
import {AiOutlineClose} from "react-icons/ai"
import UploadArea from "./uploadArea"
function UploadButton() {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
 
   
  return (
    <>
   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className="btn bg-blue-700 border-none hover:bg-blue-500 text-white" onClick={()=> (document.getElementById('my_modal_5') as HTMLFormElement).showModal()}>Upload PDF</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
  <div className="modal-box bg-white ">
    <UploadArea />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-white border-blue-700 hover:bg-blue-700 hover:text-white hover:border-none"><AiOutlineClose  className="text-black"/></button>
      </form>
    </div>
  </div>
</dialog>
    </>
  )
}

export default UploadButton
