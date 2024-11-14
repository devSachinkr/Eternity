import React from "react";
import { queryClient } from "@/lib/react-query";
import { getAllUserVideos } from "@/actions/user";
import { getFolderInfo } from "@/actions/folder";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { FolderInfo } from "@/components/dashboard/folders/folder-info";
import Videos from "@/components/global/videos";
interface Props {
  params: Promise<{
    folderId: string;
    workspaceId: string;
  }>;
}

const FolderPage = async ({ params }: Props) => {
  const { folderId, workspaceId } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos({ workspaceId: folderId }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo({ folderId }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderId={folderId} />
      <Videos folderId={folderId} workspaceId={workspaceId} videoKey="folder-videos" />
    </HydrationBoundary>
  );
};

export default FolderPage;
