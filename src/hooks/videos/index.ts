"use client";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import { VideoLocationSchema } from "@/components/global/videos/schema";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "../mutation-data";
import { useZodForm } from "../zod-form";
import { useQueryData } from "../query-data";
import { getPreviewVideo } from "@/actions/video";
import { useRouter } from "next/navigation";
import { PreviewVideoProps } from "@/types/index.type";

export const useVideoLocation = ({
  currentWorkspace,
  videoId,
}: {
  videoId: string;
  currentWorkspace: string;
}) => {
  const { folders } = useAppSelector((state) => state.folders);
  const { workspaces } = useAppSelector((state) => state.workspaces);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);
  const { mutate: moveVideo, isPending } = useMutationData({
    mutationKey: ["change-video-location"],
    mutationFn: ({
      folder_id,
      workspace_id,
    }: {
      folder_id: string;
      workspace_id: string;
    }) =>
      moveVideoLocation({
        videoId,
        folder_id,
        workspaceId: workspace_id,
      }),
  });

  const { handleSubmit, hookForm } = useZodForm({
    schema: VideoLocationSchema,
    mutationFn: moveVideo,
    defaultValues: {
      folder_id: null,
      workspaceId: currentWorkspace,
    },
  });

  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    const res = await getWorkspaceFolders({
      workspaceId: workspace,
    });
    setIsFetching(false);
    if (res.status === 200) setIsFolders(res.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);
  useEffect(() => {
    const workspace = hookForm.watch(async (data) => {
      if (data.workspace_id) fetchFolders(data.workspace_id);
    });
    return workspace.unsubscribe();
  }, [hookForm.watch]);
  return {
    isFolders,
    isFetching,
    handleSubmit,
    isPending,
    folders,
    hookForm,
    workspaces,
  };
};

export const usePreviewVideo = ({ videoId }: { videoId: string }) => {
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo({ videoId })
  );
  const { data: previewVideo, author, status } = data as PreviewVideoProps;
  if (status !== 200) router.push("/");
  const daysAgo = Math.floor(
    (new Date().getTime() - previewVideo?.createdAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return { previewVideo, author, status, daysAgo };
};
