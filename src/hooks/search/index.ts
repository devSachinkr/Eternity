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
      if (type === "USERS") {
        const workspace = await searchUsers(queryKey[1] as string);
        if (workspace.status === 200) setOnUsers(workspace.data);
      }
    },
    false
  );

  useEffect(() => {
    if (debouncedQuery) refetch();
    if (!debouncedQuery) setOnUsers(undefined);
  }, [debouncedQuery]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  return { searchQuery, onUsers, isFetching, query };
};

export { useSearch };
