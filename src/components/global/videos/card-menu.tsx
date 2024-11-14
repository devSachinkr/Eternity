import { Move } from "lucide-react";
import Modal from "../modal";
import ChangeVideoLocation from "./change-video-location";

interface Props {
  videoId: string;
  workspaceId: string;
  currentFolder?: string;
  currentFolderName?: string;
}

const CardMenu = ({
  videoId,
  workspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      title="Move to new Workspace/Folder"
      description="This action can't be undone. This will permanently delete your account and remove your data from our servers."
      className="flex items-center cursor-pointer gap-x-2"
      trigger={<Move size={20} fill={"#a4a4a4"} className="text-[#a4a4a4]"/>}
    >
      <ChangeVideoLocation
        videoId={videoId}
        workspaceId={workspaceId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        />
    </Modal>
  );
};

export default CardMenu;
