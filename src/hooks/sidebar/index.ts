"use client";

import { useRouter } from "next/navigation";
import { useQueryData } from "../query-data";
import { getWorkspaces } from "@/actions/workspace";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import { getNotifications } from "@/actions/user";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
export const useSidebar = ({
  activeWorkspaceId,
}: {
  activeWorkspaceId?: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let currentWorkspace;
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: workspaces } = data as WorkspaceProps;
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  if (activeWorkspaceId) {
    currentWorkspace = workspaces?.workspace?.find(
      (workspace) => workspace.id === activeWorkspaceId
    );
  }
  if (isFetched && workspaces) {
    dispatch(WORKSPACES({ workspaces: workspaces.workspace }));
  }
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationProps;
  return {
    onChangeActiveWorkspace,
    workspaces,
    currentWorkspace,
    count,
    isFetched,
  };
};
