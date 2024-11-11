"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";
import { useSidebar } from "@/hooks/sidebar";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/global/modal";
import { PlusCircle } from "lucide-react";
import SearchWorkspace from "@/components/global/search-workspace";
interface Props {
  activeWorkspaceId: string;
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const { onChangeActiveWorkspace, workspaces } = useSidebar();
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className=" flex bg-[#111111] p-4 gap-2 justify-center items-center  mb-4 absolute top-0 left-0 right-0">
        <Image src={"/assets/logo2.svg"} alt="logo" width={40} height={40} />
        <p className="text-white text-lg font-semibold">Eternity</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspaces?.workspace?.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspaces.members.length > 0 &&
              workspaces.members.map(
                (member) =>
                  member.Workspace && (
                    <SelectItem
                      key={member.Workspace.id}
                      value={member.Workspace.id}
                    >
                      {member.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Modal
        title="Invite To Workspace"
        trigger={
          <span className="flex cursor-pointer text-sm items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
            <PlusCircle className="w-4 h-4 text-neutral-800/90 fill-neutral-500" />
            <span className="text-neutral-500 font-semibold text-xs">
              Invite to workspace
            </span>
          </span>
        }
        description="Invite a user to your workspace"
      >
        <SearchWorkspace workspaceId={activeWorkspaceId} />
      </Modal>
    </div>
  );
};

export default Sidebar;
