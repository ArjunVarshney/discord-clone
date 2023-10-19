import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";

interface ChatQueryProps {
   queryKey: string;
   apiUrl: string;
   paramKey: "channelId" | "conversationId";
   paramValue: string;
}

const useChatQuery = ({
   queryKey,
   apiUrl,
   paramKey,
   paramValue,
}: ChatQueryProps) => {
   const { isConnected } = useSocket();

   const fetchMessages = async ({ pageParam = undefined }) => {
      const url = queryString.stringifyUrl(
         {
            url: apiUrl,
            query: {
               cursor: pageParam,
               [paramKey]: paramValue,
            },
         },
         { skipNull: true }
      );

      const res = await fetch(url);
      return res.json();
   };
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
      // @ts-ignore
      useInfiniteQuery({
         queryKey: [queryKey],
         queryFn: fetchMessages,
         getNextPageParam: (lastPage) => lastPage?.nextCursor,
         refetchInterval: isConnected ? false : 1000,
      });

   return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};

export default useChatQuery;
