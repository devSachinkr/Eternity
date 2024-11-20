import { useState, useEffect } from "react";
import { useQueryData } from "../query-data";
import { searchUsers } from "@/actions/user";

const useSearch = ({
  key,
  type,
}: {
  key: string;
  type: "USERS" | "WORKSPACES";
}) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        email: string | null;
        image: string | null;
      }[]
    | undefined
  >(undefined);

  const searchQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { refetch, isFetching } = useQueryData(
    [key, debouncedQuery],
    async ({ queryKey }) => {
      if (type === 'USERS') {
        try {
          const users = await searchUsers(queryKey[1] as string);
          if (users.status === 200) {
            setOnUsers(users.data);
            return users.data;
          } else {
            return null;  
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          return null; }
      }
  
      return null;
    },
    false
  );
  

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  
  useEffect(() => {
    if (debouncedQuery) refetch();
    if (!debouncedQuery) setOnUsers(undefined);
    
  }, [debouncedQuery]);

  return { searchQuery, onUsers, isFetching, query };
};

export { useSearch };
