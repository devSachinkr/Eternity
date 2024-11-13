"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../spinner";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useFolder } from "@/hooks/folder";

interface Props {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
}

const Folder = ({ name, id, optimistic, count }: Props) => {
  const pathName = usePathname();
  const { rename, handleClick, handleDoubleClick } = useFolder();

  return (
    <div
      onClick={() => handleClick(pathName, id)}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <Spinner loading={false}>
        <div className="flex flex-col gap-[1px]">
          <p
            className="text-neutral-300"
            onDoubleClick={handleDoubleClick}
            contentEditable={rename}
          >
            {name}
          </p>
          <span className="text-sm text-neutral-500">{count || 0} Videos</span>
        </div>
      </Spinner>
      <FolderDuotone />
    </div>
  );
};

export default Folder;
