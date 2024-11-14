"use client";
import { getAllUserVideos } from "@/actions/user";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/query-data";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import React from "react";
import VideoCard from "./video-card";

interface Props {
  folderId: string;
  videoKey: string;
  workspaceId: string;
}

const Videos = ({ folderId, videoKey, workspaceId }: Props) => {
  const { data } = useQueryData([videoKey], () =>
    getAllUserVideos({ workspaceId: folderId })
  );
  const { data: videos, status: videoStatus } = data as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-2xl ">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 g-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5   "
        )}
      >
        {videoStatus === 200 ? (
          videos.map((v) => <VideoCard key={v.id} {...v} workspaceId={workspaceId} />)
        ) : (
          <p className="text-[#BdBdBd] text-2xl">No videos found</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
