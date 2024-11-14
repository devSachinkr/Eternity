import React from "react";
import Spinner from "../spinner";
import CardMenu from "./card-menu";
import ChangeVideoLocation from "./change-video-location";

interface Props {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
}

const VideoCard = ({
  User,
  id,
  Folder,
  createdAt,
  title,
  source,
  processing,
  workspaceId,
}: Props) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );
  return (
    <Spinner loading={processing}
    className="bg-[#171717] flex justify-center"
    >
      {/* <div className="flex flex-col overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3 ">
          <CardMenu
            videoId={id}
            workspaceId={workspaceId}
            currentFolder={Folder?.id}
            currentFolderName={Folder?.name}
          />
        </div>
      </div> */}
      <ChangeVideoLocation
        videoId={id}
        workspaceId={workspaceId}
        currentFolder={Folder?.id}
        currentFolderName={Folder?.name}
      />
    </Spinner>
  );
};

export default VideoCard;
