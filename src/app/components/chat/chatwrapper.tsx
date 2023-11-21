"use client";
import { trpc } from "@/app/_trpc/client";
import ChatInput from "./chatInput";
import Messages from "./messages";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import ChatContextProvider from "./chatContext";

type ChatWrapperProps = {
  fileId: string;
};

function ChatWrapper({ fileId }: ChatWrapperProps) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex flex-col justify-center items-centermb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin " />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF{" "}
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

    if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex flex-col justify-center items-centermb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin " />
            <h3 className="font-semibold text-xl">Processing PDF...</h3>
            <p className="text-zinc-500 text-sm">
              This won&apos;t take long.{" "}
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );
    if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex flex-col justify-center items-centermb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500  " />
            <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
            <p className="text-zinc-500 text-sm">
              Your <span className="font-medium">Free</span>{" "} plan supports up to 5 pages per PDF
            </p>
            <Link href='/dashboard' className="cursor-pointer p-3 rounded-lg mt-2 bg-zinc-200"><div className="flex"><ChevronLeft className="h-4 w-4 mr-1.5 mt-1.5"/> Back</div></Link>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );


  return (
    <ChatContextProvider fileId={fileId}>
    <div className="relative min-h-full bg-zinc-50 divide-y flex divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex flex-col flex-1 justify-between mb-28">
        <Messages fileId= {fileId}/>
      </div>
      <ChatInput />
    </div>
   </ChatContextProvider>
  );
}

export default ChatWrapper;
