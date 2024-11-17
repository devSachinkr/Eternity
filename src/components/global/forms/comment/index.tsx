"use client";
import React from "react";
import { useCommentForm } from "@/hooks/comment/index";
import { Send } from "lucide-react";
import FormGenerator from "../../form-generator";
import { Button } from "@/components/ui/button";
import Spinner from "../../spinner";

interface Props {
  videoId: string;
  commentId?: string;
  author: string;
  closeForm?: () => void;
}

const CommentForm = ({ videoId, commentId, author, closeForm }: Props) => {
  const {
    handleSubmit,
    hookForm: {
      register,
      formState: { errors },
    },
    isPending,
  } = useCommentForm({ videoId, commentId });
  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        name="comment"
        placeholder={`Response to author ${author}`}
        type="text"
        inputType="textarea"
        lines={5}
      />
      <Button
        className="p-0 bg-transparent absolute bottom-2 right-3 hover:bg-transparent"
        type="submit"
        disabled={isPending}
      >
        <Spinner loading={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Spinner>
      </Button>
    </form>
  );
};

export default CommentForm;
