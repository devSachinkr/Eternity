"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const hasAccessToWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const isUserInWorkspace = await db.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return isUserInWorkspace
      ? { status: 200, data: isUserInWorkspace }
      : { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getWorkspaceFolders = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  if (!workspaceId) return { status: 400 };
  try {
    const isFolders = await db.folder.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (!isFolders || isFolders.length === 0) return { status: 403 };
    return { status: 200, data: isFolders };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getWorkspaces = async () => {
  const user = await currentUser();
  if (!user) return { status: 403 };
  try {
    const res = await db.user.findUnique({
      where: { clerkId: user.id },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            type: true,
            name: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (res ) return { status: 200, data: res };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
