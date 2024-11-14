"use client";

import { getFolderInfo } from "@/actions/folder";
import { useQueryData } from "@/hooks/query-data";
import { FolderProps } from "@/types/index.type";
interface Props {
  folderId: string;
}
export const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder-info"], () =>
    getFolderInfo({ folderId })
  );
  const { data: folderData, status } = data as FolderProps;
  return (<div className="flex items-center" >
      <h2 className="text-[#BdBdBd] text-2xl ">
        {folderData?.name}
      </h2>
    </div>
  );
};
