import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User2 } from "lucide-react";
import Link from "next/link";
import Spinner from "../spinner";
import CardMenu from "./card-menu";
import CopyLink from "./copy-link";

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
    <Spinner
      loading={processing}
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
    >
      <div className="flex group flex-col overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] rounded-xl">
        <div className="absolute hidden top-3 right-3 z-50 group-hover:flex flex-col gap-y-3 ">
          <CardMenu
            videoId={id}
            workspaceId={workspaceId}
            currentFolder={Folder?.id}
            currentFolderName={Folder?.name}
          />
          <CopyLink variant="ghost" className="p-0 h-5 hover:bg-demonGreen" videoId={id} />
        </div>
        <Link
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
          href={`/preview/${id}`}
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source src={`${process.env.NEXT_PUBLIC_FRONT_STREAM_URL}/${source}#t=1`} />
          </video>
          <div className="flex flex-col gap-y-2 z-20 py-3 px-5">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">{title}</h2>
            <div className="flex gap-x-2 items-center mt-3 ">
              <Avatar className="mt-2 w-8 h-8">
                <AvatarImage src={User?.image as string} />
                <AvatarFallback>
                  <User2/>
                </AvatarFallback>
              </Avatar>
              <div className="" >
                <p className="capitalize text-sm text-[#BDBDBD]">{User?.firstname} {User?.lastname}</p>
                <p className="text-xs text-[#BDBDBD] flex items-center "><Dot/> {daysAgo===0 ? "Today" : `${daysAgo} days ago`}</p>
              </div>
            </div>
            <div className="mt-2">
              <span className="flex gap-x-1 items-center">
                <Share2
                fill="#9D9D9D"
                className="text-[#9D9D9D]"
                size={12}
                />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {User?.firstname}{"'s"} Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Spinner>
  );
};

export default VideoCard;
