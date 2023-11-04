'use client'
import { useState } from "react";
import Dropzone from "react-dropzone";
import { AiOutlineCloud, AiOutlineFile } from "react-icons/ai";

function UploadArea() {
    const [isUploading, setIsUploading] = useState<boolean>(true)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const progresSimulation = () => {
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {if(prevProgress >= 95){
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)
  return interval}
  return (
    <Dropzone
      multiple={false}
      onDrop={ async (acceptedFile) => {
      setIsUploading(true)
      const progressInterval = progresSimulation()
      await new Promise((resolve) => setTimeout(resolve, 10000))
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloud size={`30px`} />
                <p className="mb-2 text-sm text-zinc-700 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-sm text-zinc-500">PDF (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <AiOutlineFile />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {
                isUploading ? (<div className="flex items-center justify-center w-full mt-5 max-w-xs mx-auto">
<progress className="progress progress-info w-56" value={uploadProgress} max="100"></progress>

                </div>) : null
              }
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default UploadArea;
