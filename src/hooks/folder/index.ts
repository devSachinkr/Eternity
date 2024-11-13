"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const useFolder = () => {
  const [rename, setRename] = useState(false);
  const router = useRouter();
  const handleClick = (pathname: string, id: string) => {
    router.push(`${pathname}/folder/${id}`);
  };
  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setRename(true);
  };
  return { rename, handleClick, handleDoubleClick };
};
