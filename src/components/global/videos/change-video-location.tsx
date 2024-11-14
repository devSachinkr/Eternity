import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useVideoLocation } from "@/hooks/videos";
import React from "react";

interface Props {
  videoId: string;
  workspaceId?: string;
  currentFolder?: string;
  currentFolderName?: string;
}

const ChangeVideoLocation = ({
  videoId,
  workspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  const {
    folders,
    isFolders,
    isFetching,
    handleSubmit,
    isPending,
    hookForm,
    workspaces,
  } = useVideoLocation({ videoId, currentWorkspace: workspaceId as string });
  const folder =folders.find((f)=>f.id === currentFolder)
  const workspace =workspaces.find((w)=>w.id === workspaceId)

  return (
    <form className="flex flex-col gap-y-5">
      <div className=" border-[1px] border-demonGreen rounded-xl p-5 ">
        <h2
          className="text-[#fff] text-xs mb-5 px-4 py-2 bg-demonGreen
        w-fit rounded-xl font-semibold"
        >
          Current
        </h2>
        {workspace && <p className="text-[#BdBdBd] ">{workspace.name}</p>}
        <p className="text-[#BdBdBd] text-sm">This video has no folder</p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2
          className="text-[#fff] text-xs mb-5 px-4 py-2 bg-demonGreen
        w-fit rounded-xl font-semibold"
        >
          To
        </h2>
        <Label className="flex-col flex gap-y-2 ">
          <p className="text-xs">Workspace</p>
          <select className="rounded-xl text-base bg-transparent ">
            <option value={"sdfbsdfhu"}>Workspace </option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
