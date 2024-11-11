"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryData } from "../query-data";
import { getWorkspaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types/index.type";
export const useSidebar = () => {
  const router = useRouter();
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(
    null
  );
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: workspaces } = data as WorkspaceProps;
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return {
    activeWorkspaceId,
    setActiveWorkspaceId,
    onChangeActiveWorkspace,
    workspaces,
  };
};
