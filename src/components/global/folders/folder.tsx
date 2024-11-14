"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import Spinner from "../spinner";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useFolder } from "@/hooks/folder";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
}

const Folder = ({ name, id, optimistic, count }: Props) => {
  const pathName = usePathname();
  const {
    rename,
    handleClick,
    handleDoubleClick,
    onUpdateFolderName,
    folderCardRef,
    inputRef,
    latestVariables,
  } = useFolder({
    folderId: id,
  });

  return (
    <div
      ref={folderCardRef}
      onClick={() => handleClick(pathName, id)}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <Spinner loading={false}>
        <div className="flex flex-col gap-[1px]">
          {rename ? (
            <Input
              onBlur={onUpdateFolderName}
              autoFocus
              placeholder={name}
              className="border-none  text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              className="text-neutral-300"
              onDoubleClick={handleDoubleClick}
              onClick={(e) => e.stopPropagation()}
            >
              {latestVariables &&
              latestVariables.status === "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}

          <span className="text-sm text-neutral-500">{count || 0} Videos</span>
        </div>
      </Spinner>
      <FolderDuotone />
    </div>
  );
};

export default Folder;
