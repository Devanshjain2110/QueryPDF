import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/app/config/infinite-queries";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./chatContext";
import { Loader2, MessageSquare } from "lucide-react";
import { useIntersection } from '@mantine/hooks'
import Message from "./message";

interface MessagesProps {
  fileId: string;
}

function Messages({ fileId }: MessagesProps) {
  const { isLoading: isAiThinking } =
    useContext(ChatContext)
  const {data, isLoading, fetchNextPage} = trpc.getFileMessages.useInfiniteQuery(
    {
      fileId,
      limit: INFINITE_QUERY_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      keepPreviousData: true,
    }
  )
  const messages = data?.pages.flatMap(
    (page) => page.messages
  )

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: 'loading-message',
    isUserMessage: false,
    text: (
      <span className='flex h-full items-center justify-center'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </span>
    ),
  }

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ]

  const lastMessageRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])
;
return (
  <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
    {combinedMessages && combinedMessages.length > 0 ? (
      combinedMessages.map((message, i) => {
        const isNextMessageSamePerson =
          combinedMessages[i - 1]?.isUserMessage ===
          combinedMessages[i]?.isUserMessage

        if (i === combinedMessages.length - 1) {
          return (
            <Message
              ref={ref}
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message.id}
            />
          )
        } else
          return (
            <Message
            
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message.id}
            />
          )
      })
    ) : isLoading ? (
      <div className='w-full flex flex-col gap-2'>
        <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div>
          <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div>
          <div className="p-3 w-auto h-14 md:h-32 bg-slate-200 rounded-md animate-pulse m-4"></div> 
      </div>
    ) : (
      <div className='flex-1 flex flex-col items-center justify-center gap-2'>
        <MessageSquare className='h-8 w-8 text-blue-500' />
        <h3 className='font-semibold text-xl'>
          You&apos;re all set!
        </h3>
        <p className='text-zinc-500 text-sm'>
          Ask your first question to get started.
        </p>
      </div>
    )}
  </div>
)
}

export default Messages;


