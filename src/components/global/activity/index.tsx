"use client";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import CommentForm from "../forms/comment";
import CommentCard from "./comment-card";
import { useQueryData } from "@/hooks/query-data";
import { getVideoComments } from "@/actions/user";
import { VideoCommentProps } from "@/types/index.type";

interface Props {
  author: string;
  videoId: string;
}

const Activity = ({ author, videoId }: Props) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );
  const { data: comment } = data as VideoCommentProps;
  return (
    <TabsContent value="Activity">
      <div className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-6">
        <CommentForm videoId={videoId} author={author} />
        {comment?.map((c) => (
          <CommentCard
            comment={c?.comment}
            key={c?.id}
            author={{
              image: c?.User?.image as string,
              firstname: c?.User?.firstname as string,
              lastname: c?.User?.lastname as string,
            }}
            videoId={videoId}
            commentId={c?.id}
            reply={c?.reply}
            isReply={false}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default Activity;
