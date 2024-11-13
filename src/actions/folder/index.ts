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
