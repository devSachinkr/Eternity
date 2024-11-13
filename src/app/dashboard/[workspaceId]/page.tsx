import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import React from "react";
import CreateWorkspaceButton from "./_components/create-workspace-button";
import CreateFolderButton from "./_components/create-folder-button";
import Folders from "@/components/global/folders";

interface Props {
  params: Promise<{
    workspaceId: string;
  }>;
}

const Page = async (props: Props) => {
  const params = await props.params;

  const { workspaceId } = params;

  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-[13px] rounded-full px-6 data-[state=active]:bg-demonGreen/80"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="p-[13px] rounded-full px-6 data-[state] data-[state=active]:bg-demonGreen/80"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspaceButton />
            <CreateFolderButton workspaceId={workspaceId} />
          </div>
        </div>
        <section className="py-10">
          <TabsContent value="videos">
            <Folders workspaceId={workspaceId} />
          </TabsContent>
          <TabsContent value="archive">
            <div>On Construction</div>
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default Page;
