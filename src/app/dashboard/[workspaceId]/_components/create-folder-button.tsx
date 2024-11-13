"use client";
import FolderDuotone from "@/components/icons/folder-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/folder";
import React from "react";

interface Props {
  workspaceId: string;
}

const CreateFolderButton = ({ workspaceId }: Props) => {
  const { onCreateFolder } = useCreateFolders({ workspaceId });
  return (
    <Button
      className="bg-demonGreen hover:bg-demonGreen/80 text-white flex items-center gap-2 py-6 px-4 rounded-2xl"
      onClick={onCreateFolder}
    >
      <FolderDuotone />
      Create Folder
    </Button>
  );
};

export default CreateFolderButton;
