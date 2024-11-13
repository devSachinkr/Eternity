"use client";
import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React, { useState , useEffect } from "react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/query-data";
import { getWorkspaceFolders } from "@/actions/workspace";
import {  useMutationDataState } from "@/hooks/mutation-data";
import { FoldersProps } from "@/types/index.type";
interface Props {
  workspaceId: string;
}

const Folders = ({ workspaceId }: Props) => {
    const [isClient, setIsClient] = useState(false);
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders({ workspaceId })
  );
  const { latestVariables } = useMutationDataState({
    mutationKey: ["create-folder"],
  });
  const { data: folders, status } = data as FoldersProps;
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">More</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
              />
            )}
            {folders.map((f) => (
              <Folder
                name={f.name}
                count={0}
                id={f.id}
                key={f.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
