"use client";
import { BiGhost, BiMessageDots, BiPlus, BiTrashAlt } from "react-icons/bi";
import { trpc } from "../_trpc/client";
import UploadButton from "./uploadButton";
import Link from "next/link";
import { format } from "date-fns";

function Dashboard() {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>

        <UploadButton />
      </div>

      {/* Display User Files */}
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
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

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <BiPlus />
                    {format(new Date(file.createAt), "MMM yyyy")}
                  </div>

                  <div className="flex items-center gap-2">
                    <BiMessageDots />
                  </div>

                  <button>
                    <BiTrashAlt />
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
