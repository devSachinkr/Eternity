"use client";

import { createComment, getUserProfile } from "@/actions/user";
import { useMutationData } from "../mutation-data";
import { useQueryData } from "../query-data";
import { useZodForm } from "../zod-form";
import { z } from "zod";
export const useCommentForm = ({
  videoId,
  commentId,
}: {
  videoId: string;
  commentId?: string;
}) => {
  const { data } = useQueryData(["user-profile"], getUserProfile);
  const { data: user, status } = data as {
    data: {
      id: string;
      image: string;
    };
    status: number;
  };
  const { mutate, isPending } = useMutationData({
    mutationKey: ["new-comment"],
    mutationFn: ({ comment }) =>
      createComment({ comment, videoId, commentId, userId: user.id }),
    queryKey: "video-comments",
    onSuccess: () => {
      hookForm.reset();
    },
  });
  const { handleSubmit, hookForm } = useZodForm({
    schema: z.object({
      comment: z.string().min(1, "Comment is required"),
    }),
    mutationFn: mutate,
    defaultValues: {
      comment: "",
    },
  });
  return { handleSubmit, hookForm, isPending };
};
