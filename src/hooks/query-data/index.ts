'use client'

import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (queryKey: QueryKey, queryFn: QueryFunction, enabled?: Enabled) => {
  
    const {data, isFetching,isPending,refetch,isFetched} = useQuery({
        queryKey,
        queryFn,
        enabled
    })

    return {data, isFetching,isPending,refetch,isFetched}
};
