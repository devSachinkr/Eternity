"use client";
import { WorkSpace } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  workspace: WorkSpace;
  workspaceId: string;
}

const GlobalHeader = ({ workspace, workspaceId }: Props) => {
  const pathName = usePathname().split(`/dashboard/${workspaceId}`)[1];

  return (
    <article className="flex flex-col gap-2">
      <span className=" text-xs text-[#fff] font-bold px-4 py-1 rounded-full bg-demonGreen/60 w-fit">
        {pathName.includes("video") ? "" : workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl font-bold">
        {pathName && !pathName.includes("folder") && !pathName.includes("video")
          ? pathName.charAt(1).toUpperCase() + pathName.slice(2).toLowerCase()
          : pathName.includes("video")
          ? ""
          : "My Library"}
      </h1>
    </article>
  );
};

export default GlobalHeader;
