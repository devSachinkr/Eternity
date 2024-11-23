import React from "react";
import { useSearch } from "@/hooks/search";
import { useMutationData } from "@/hooks/mutation-data";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Spinner from "../spinner";
import { inviteMembers } from "@/actions/user";
interface Props {
  workspaceId: string;
}

const Search = ({ workspaceId }: Props) => {
  const { searchQuery, onUsers, isFetching, query } = useSearch({
    key: "get-users",
    type: "USERS",
  });

  const { mutate, isPending } = useMutationData({
    mutationKey: ["invite-member"],
    mutationFn: (data: {
      receiverId: string;
      email: string;
      receiverName?: string;
    }) =>
      inviteMembers(workspaceId, {
        ...data,
        receiverId: onUsers?.[0]?.id || "",
      }),
  });
  return (
    <div className="flex flex-col gap-y-6 ">
      <Input
        onChange={searchQuery}
        value={query}
        className="bg-transparent border-2 outline-none"
        placeholder="Search for your user"
        type="text"
      />
      {isFetching && (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl " />
        </div>
      )}

      {onUsers && onUsers.length === 0 && (
        <p className="text-center text-sm text-gray-500">No user found</p>
      )}
      {onUsers &&
        onUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-x-2 border-2 rounded-xl p-4 "
          >
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>
                {user?.firstname?.charAt(0)}
                {user?.lastname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h3 className="text-bold text-lg capitalize">
                {user.firstname} {user.lastname}
              </h3>
              <p className="text-sm uppercase  font-semibold bg-demonGreen text-white rounded-lg px-2">
                {user.subscription?.plan}
              </p>
            </div>
            <div className="flex flex-1 justify-end items-center">
              <Button
                onClick={() =>
                  mutate({
                    recieverId: user.id,
                    email: user.email,
                    receiverName: user.firstname + " " + user.lastname,
                  })
                }
                variant="default"
                className="w-5/12 font-bold"
              >
                <Spinner loading={isPending}>Invite</Spinner>
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
