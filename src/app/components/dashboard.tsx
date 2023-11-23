"use client";
import { BiGhost, BiMessageDots, BiPlus, BiTrashAlt } from "react-icons/bi";
import { trpc } from "../_trpc/client";
import UploadButton from "./uploadButton";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";


interface PageProps {
  subscriptionPlan : Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}
function Dashboard({subscriptionPlan} : PageProps ) {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] =
    useState<String | null>(null);
  const utils = trpc.useContext();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>

        <UploadButton isSubscribed={subscriptionPlan.isSubscribed}/>
      </div>

      {/* Display User Files */}
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-3 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <BiPlus />
                    {format(new Date(file.createdAt), "MMM yyyy")}
                  </div>

                  <div className="flex items-center gap-2">
                    <BiMessageDots size={'17px'}/> mocked
                  </div>

                  <button onClick={() => deleteFile({ id: file.id })}>
                    {currentlyDeletingFile === file.id ? (
                      <>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                          <span className="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <div className="bg-rose-100 py-2 px-8 rounded-lg">
                      <BiTrashAlt className="text-red-500" size={"17px"}/>
                      </div>
                    )}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <>
          <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div>
          <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div>
          <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div>
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <BiGhost size={"40px"} className="" />

          <h3 className="font-semibold text-xl">Pretty Empty Around here</h3>
          <p>Let&apos;s upload your pdf</p>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
