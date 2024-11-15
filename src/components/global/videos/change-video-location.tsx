import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useVideoLocation } from "@/hooks/videos";
import Spinner from "../spinner";

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
  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === workspaceId);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <div className=" border-[1px] border-demonGreen rounded-xl p-5 ">
        <h2
          className="text-[#fff] text-xs mb-2 px-4 py-2 bg-demonGreen
        w-fit rounded-xl font-semibold"
        >
          Current Workspace
        </h2>
        {workspace && <p className="text-[#BdBdBd] ">{workspace.name}</p>}
        <h2
          className="text-[#fff] text-xs mb-2 px-4 py-2 bg-demonGreen
        w-fit rounded-xl font-semibold mt-3"
        >
          {" "}
          Current Folder
        </h2>
        {folder ? (
          <p className="text-[#BdBdBd] text-sm">{currentFolderName} FOLDER</p>
        ) : (
          <p className="text-[#BdBdBd] text-sm">This video has no folder</p>
        )}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2
          className="text-[#fff] text-xs mb-4 px-4 py-2 bg-demonGreen
        w-fit rounded-xl font-semibold"
        >
          To
        </h2>
        <Label className="flex-col flex gap-y-2 ">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-accent  "
            {...hookForm.register("workspace_id")}
          >
            {workspaces.map((w) => (
              <option className="text-white" key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-40 rounded-xl" />
        ) : (
          <Label className="flex-col flex gap-y-2 ">
            <p className="text-xs">Folder</p>
            {isFolders?.length ? (
              <select
                className="rounded-xl bg-accent text-base"
                {...hookForm.register("folder_id")}
              >
                {isFolders.map((f, key) =>
                  key === 0 ? (
                    <option className="text-white" key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ) : (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#BdBdBd] text-sm">
                This workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="bg-demonGreen hover:bg-demonGreen/60 text-white font-semibold">
        <Spinner loading={isPending}>Move</Spinner>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
