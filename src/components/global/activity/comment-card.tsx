import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";
import React, { useState } from "react";
import CommentForm from "../forms/comment";

interface Props {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
}

const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);

  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1D1D1D] pl-10  border-none mt-[22px]"
          : "border-[1px] bg-[#1D1D1D] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar>
          <AvatarImage src={author.image} />
          <AvatarFallback>{author.firstname}</AvatarFallback>
        </Avatar>
        <p className="capitalize text-sm text-[#BDBDBD] ">
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div>
        <p className="text-[#BDBDBD]">{comment}</p>
      </div>
      {!isReply && (
        <div className="flex justify-end mt-3 ">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className="text-sm bg-[#252525] rounded-full text-white hover:text-black"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              videoId={videoId}
              author={author.firstname}
              commentId={commentId}
            />
          )}
        </div>
      )}
      {reply?.map((r) => (
        <CommentCard
          key={r?.id}
          comment={r?.comment}
          author={{
            image: r?.User?.image as string,
            firstname: r?.User?.firstname as string,
            lastname: r?.User?.lastname as string,
          }}
          videoId={videoId}
          commentId={r?.id}
          reply={[]}
          isReply
        />
      ))}
    </Card>
  );
};

export default CommentCard;
