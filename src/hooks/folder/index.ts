"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutationData, useMutationDataState } from "../mutation-data";
import { updateFolder } from "@/actions/workspace";
import { createFolder } from "@/actions/folder";
export const useFolder = ({ folderId }: { folderId: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const folderCardRef = useRef<HTMLDivElement>(null);
  const [rename, setRename] = useState(false);

  const reName = () => setRename(true);
  const reNamed = () => setRename(false);
  const router = useRouter();
  const handleClick = (pathname: string, id: string) => {
    router.push(`${pathname}/folder/${id}`);
  };
  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    reName();
  };
  const { mutate: renameFolder,isPending } = useMutationData({
    mutationKey: ["rename-folders"],
    mutationFn: (data: { name: string }) =>
      updateFolder({ name: data.name, id: folderId }),
    queryKey: "workspace-folders",
    onSuccess: () => reNamed(),
  });
  const { latestVariables } = useMutationDataState({
    mutationKey: ["rename-folders"],
  });
  const onUpdateFolderName = () => {
    if (inputRef.current && folderCardRef.current) {
      if (inputRef.current.value) {
        renameFolder({ name: inputRef.current.value });
      } else {
        reNamed();
      }
    }
  };
  return {
    rename,
    handleClick,
    handleDoubleClick,
    inputRef,
    folderCardRef,
    onUpdateFolderName,
    latestVariables,
    isPending,
  };
};

export const useCreateFolders = ({ workspaceId }: { workspaceId: string }) => {
  const { mutate } = useMutationData({
    mutationKey: ["create-folder"],
    mutationFn: () => createFolder({ workspaceId }),
    queryKey: "workspace-folders",
  });

  const onCreateFolder = () =>
    mutate({ name: "Untitled", id: "optimistic--id" });
  return { onCreateFolder };
};
