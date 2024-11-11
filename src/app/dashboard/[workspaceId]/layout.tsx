import { onAuthUser } from "@/actions/auth";
import { getAllUserVideos, getNotifications } from "@/actions/user";
import {
  getWorkspaceFolders,
  getWorkspaces,
  hasAccessToWorkspace,
} from "@/actions/workspace";
import Sidebar from "@/components/dashboard/sidebar";
import { queryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const layout = async ({ children, params: { workspaceId } }: Props) => {
  const authUser = await onAuthUser();
  if (!authUser.user?.workspace) return redirect("/auth/sign-in");
  if (!authUser.user?.workspace.length) return redirect("/auth/sign-in");
  const hasAccess = await hasAccessToWorkspace({ workspaceId });
  if (hasAccess.status !== 200)
    return redirect(`/dashboard/${authUser.user?.workspace[0].id}`);
  if (!hasAccess.data) return null;

  await queryClient.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders({ workspaceId }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos({ workspaceId }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        {children}
      </div>
    </HydrationBoundary>
  );
};

export default layout;
