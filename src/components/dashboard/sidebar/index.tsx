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
import { Menu, PlusCircle } from "lucide-react";
import Search from "@/components/global/search-user";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import WorkspacePlaceHolder from "./workspace-place-holder";
import GlobalCard from "@/components/global/card";
import Spinner from "@/components/global/spinner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "./info-bar";
interface Props {
  activeWorkspaceId: string;
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const pathName = usePathname();
  const { onChangeActiveWorkspace, workspaces, currentWorkspace, count } =
    useSidebar();
  const sidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center your-scrollable-container">
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

      {currentWorkspace?.type === "PUBLIC" &&
        workspaces.subscription?.plan === "PRO" && (
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
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {MENU_ITEMS(activeWorkspaceId).map((item) => (
            <SidebarItem
              data={item}
              key={item.title}
              selected={
                pathName.split("/").pop() === item.href.split("/").pop()
              }
              notifications={
                (item.title === "Notification" &&
                  count?._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator />

      <p className="text-[#9D9D9D] font-bold mt-4 w-full ">Workspaces</p>
      {workspaces.workspace.length === 1 && workspaces.members.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-[#9D9D9D] font-medium text-sm">
            {workspaces?.subscription?.plan === "FREE"
              ? "Upgrade to create Workspaces"
              : "No Workspaces"}
          </div>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspaces.workspace.length &&
            workspaces.workspace.map(
              (workspace) =>
                workspace.type !== "PERSONAL" && (
                  <SidebarItem
                    data={{
                      href: `/dashboard/${workspace.id}`,
                      title: workspace.name,
                      icon: (
                        <WorkspacePlaceHolder>
                          {workspace.name.charAt(0)}
                        </WorkspacePlaceHolder>
                      ),
                    }}
                    selected={pathName === `/dashboard/${workspace.id}`}
                    notifications={0}
                    key={workspace.id}
                  />
                )
            )}
          {workspaces.members.length > 0 &&
            workspaces.members.map(
              (member) =>
                member.Workspace && (
                  <SidebarItem
                    data={{
                      href: `/dashboard/${member.Workspace.id}`,
                      title: member.Workspace.name,
                      icon: (
                        <WorkspacePlaceHolder>
                          {member.Workspace.name.charAt(0)}
                        </WorkspacePlaceHolder>
                      ),
                    }}
                    selected={pathName === `/dashboard/${member.Workspace.id}`}
                    notifications={0}
                    key={member.Workspace.id}
                  />
                )
            )}
        </ul>
      </nav>

      <Separator />
      {workspaces.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to PRO"
          description="Unlock AI features like transcription, AI Summary, and more."
        >
          <Button className="text-sm w-full mt-2">
            <Spinner loading={false}>Upgrade</Spinner>
          </Button>
        </GlobalCard>
      )}
    </div>
  );
  return (
    <div className="full">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            {sidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{sidebarSection}</div>
    </div>
  );
};

export default Sidebar;
