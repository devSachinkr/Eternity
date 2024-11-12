"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getAllUserVideos = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const user = await currentUser();
  if (!user) return { status: 403 };
  try {
    const videos = await db.video.findMany({
      where: {
        OR: [
          {
            folderId: workspaceId,
          },
          {
            workSpaceId: workspaceId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) return { status: 200, data: videos };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const notifications = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length)
      return { status: 200, data: notifications };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403, data: undefined };
    const users = await db.user.findMany({
      where: {
        OR: [
          {
            firstname: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            lastname: {
              contains: query,
            },
          },
        ],
        NOT: [
          {
            clerkId: user.id,
          },
        ],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        email: true,
        image: true,
      },
    });
    if (users && users.length)
      return { status: 200, data: users };
    return { status: 403, data: undefined };
  } catch (error) {
    console.log(error);
    return { status: 500, data: undefined };
  }
};

export const inviteMembers = async (workspaceId: string, data: { receiverId: string; email: string }) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

