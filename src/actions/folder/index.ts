"use server";

import { db } from "@/lib/prisma";

export const createFolder = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    if (!workspaceId) return { status: 400, message: "Invalid workspace id" };
    const res = await db.workSpace.update({
      where: { id: workspaceId },
      data: {
        folders: {
          create: {
            name: "Untitled",
          },
        },
      },
    });
    if (!res) return { status: 400, message: "Failed to create folder" };

    return { status: 200, message: "Folder created successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal server error" };
  }
};

export const getFolderInfo = async ({ folderId }: { folderId: string }) => {
  try {
    if (!folderId) return { status: 400, message: "Invalid folder id" };
    const res = await db.folder.findUnique({
      where: { id: folderId },
      select: {
        name: true,
        id: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (!res) return { status: 400, message: "Folder not found" };
    return {
      status: 200,
      message: "Folder info fetched successfully",
      data: res,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal server error" };
  }
};
