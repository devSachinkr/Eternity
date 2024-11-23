"use client";

import { usePreviewVideo } from "@/hooks/videos";
import { truncateString } from "@/lib/utils";
import CopyLink from "../copy-link";
import RichLink from "../rich-link";
import EditVideo from "./edit-video";
import TabMenu from "@/components/tabs";
import AiTools from "../../ai-tools";
import VideoTranscript from "../../video-transcript";
import Activity from "../../activity";

interface Props {
  videoId: string;
}

const PreviewVideo = ({ videoId }: Props) => {
  const { previewVideo, author, daysAgo } = usePreviewVideo({
    videoId,
  });
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3   lg:py-10 overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between">
            <h2 className="text-white text-4xl font-bold ">
              {previewVideo.title}
            </h2>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={previewVideo.title as string}
                description={previewVideo.description as string}
              />
            ) : (
              <></>
            )}
          </div>
          <span className="flex gap-x-3 items-center  mt-2">
            <p className=" capitalize px-3 py-1 rounded-lg bg-demonGreen text-white ">
              {previewVideo.User?.firstname} {previewVideo.User?.lastname}
            </p>
            <p className="text-[#707070]  ">
              {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </span>
        </div>
        <video
          preload="metadata"
          controls
          className="w-full aspect-video opacity-50 rounded-xl"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${previewVideo.source}#1`}
            type="video/mp4"
          />
        </video>
        <div className="flex flex-col text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#BDBDBD] font-semibold ">Description</p>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={previewVideo.title as string}
                description={previewVideo.description as string}
              />
            ) : (
              <></>
            )}
          </div>
          <p className="text-[#9D9D9D] text-lg text-medium">
            {previewVideo.description}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3 items-center ">
          <CopyLink
            videoId={videoId}
            variant="outline"
            className="rounded-full bg-transparent px-10 border-[1px] border-demonGreen"
          />
          <RichLink
            id={videoId}
            description={truncateString(
              previewVideo.description as string,
              150
            )}
            source={previewVideo.source as string}
            title={previewVideo.title as string}
          />
        </div>
        <div>
          <TabMenu
            triggers={["Ai Tools", "Transcript", "Activity"]}
            defaultValue="Ai Tools"
          >
            <AiTools />
            <VideoTranscript transcript={previewVideo.description as string} />
            <Activity author={previewVideo.User?.firstname as string} videoId={videoId} />
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default PreviewVideo;
