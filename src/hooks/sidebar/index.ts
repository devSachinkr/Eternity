"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryData } from "../query-data";
import { getWorkspaces } from "@/actions/workspace";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import { getNotifications } from "@/actions/user";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
export const useSidebar = () => {
  const dispatch=useDispatch();
  const router = useRouter();
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(
    null
  );
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: workspaces } = data as WorkspaceProps;
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const currentWorkspace = workspaces?.workspace?.find(
    (workspace) => workspace.id === activeWorkspaceId
  );
  if (isFetched && workspaces) {
    dispatch(WORKSPACES({ workspaces: workspaces.workspace }));
  }
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationProps;
  return {
    activeWorkspaceId,
    setActiveWorkspaceId,
    onChangeActiveWorkspace,
    workspaces,
    currentWorkspace,
    count,
    isFetched
  };
};
