import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "../mutation-data";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import { useZodForm } from "../zod-form";
import { VideoLocationSchema } from "@/components/global/videos/schema";

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
      workspaceId,
    }: {
      folder_id: string;
      workspaceId: string;
    }) =>
      moveVideoLocation({
        videoId,
        folder_id,
        workspaceId,
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
  return { isFolders, isFetching, handleSubmit, isPending, folders ,hookForm,workspaces};
};
