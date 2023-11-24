"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { useResizeDetector } from "react-resize-detector";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleBar from 'simplebar-react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { BiChevronDown,  BiRotateRight, BiSearch } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PdfFullScreen from "./pdfFullScreen";



type PdfRendererProps = {
  url: string;
};

const loader = (
  <div role="status    ">
    <svg
      aria-hidden="true"
      className="w-7 h-7 my-20 mx-[400px]  mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Redirecting...</span>
  </div>
);
function PdfRenderer({ url }: PdfRendererProps) {
  const { width, ref, height } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1)
const [rotation, setRotation] = useState<number>(0)
const {toast} = useToast()
  const customPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });
  type TCustomPageValidator = z.infer<typeof customPageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(customPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex">
          <button
            className="p-4 rounded-md hover:bg-zinc-100"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage-1))
            }}
          >
               <FaChevronUp />
          </button>
          <div className="flex items-center gap-1.5">
            <input
              {...register("page")}
              type="text"
              placeholder="Page"
              className={cn(
                "input text-lg input-bordered text-center rounded-lg max-w-xs bg-inherit w-[30px] hover:border-blue-700 hover:border-2",
                errors.page && "border-red-400 border-2 hover:border-red-400"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span className="text-xl">/</span>
              <span className="text-xl"> {numPages ?? "X"}</span>
            </p>
          </div>
          <button
            className="p-4 ml-1 rounded-md hover:bg-zinc-100"
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
              setValue("page", String(currPage+1))
            }}
          >
              <FaChevronDown />
       
          </button>
        </div>
        <div className='flex space-x-2'>
       
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
             
              <button
                className='gap-1.5'
                aria-label='zoom'
                > <div className="flex justify-between">
                <BiSearch className='h-5 w-5 mt-1 mr-1' size={'40px'} />
                <span className="font-semibold">{scale * 100}%</span>
                <BiChevronDown className='h-5 w-5 mt-[3px] ml-1 opacity-50' />   </div>
              </button>
           
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    <button onClick={() => setRotation((prev) => prev + 90)} className="p-3 hover:bg-zinc-100 rounded-xl">
      <BiRotateRight  size={20}/>
    </button>
    <PdfFullScreen fileUrl={url}/>
         </div>

    
      </div>

      <div className="flex-1  w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="">
          <Document
            loading={loader}
            file={url}
            className="max-h-full"
            onLoadError={() => {
              return (
                toast({
                  title  : 'Error Loading Pdf',
                  description : 'Please Try Again Later',
                  variant : 'destructive'
                })
              );
            }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
          >
            <Page pageNumber={currPage} width={width ? width : 1} scale={scale} rotate={rotation} />
          </Document>
        </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default PdfRenderer;
