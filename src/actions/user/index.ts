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
    if (users && users.length) return { status: 200, data: users };
    return { status: 403, data: undefined };
  } catch (error) {
    console.log(error);
    return { status: 500, data: undefined };
  }
};

export const inviteMembers = async (
  workspaceId: string,
  data: { receiverId: string; email: string }
) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const res = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (res) return { status: 200, data: res };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const res = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (res) return { status: 200, data: res.firstView };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const enableFirstView = async (checked: boolean) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const res = await db.user.update({
      where: {
        clerkId: user.id,
      },
      data: { firstView: checked },
    });
    if (res)
      return {
        status: 200,
        message: "First view settings updated successfully",
      };
    return { status: 403, message: "Failed to update first view settings" };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const createComment = async ({
  comment,
  videoId,
  commentId,
  userId,
}: {
  comment: string;
  videoId: string;
  commentId?: string;
  userId: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const res = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        reply: {
          create: {
            comment,
            userId,
            videoId,
          },
        },
      },
    });
    if (res) return { status: 200, message: "Reply Posted" };
    const newComment = await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        Comment: {
          create: {
            comment,
            userId,
          },
        },
      },
    });
    if (newComment) return { status: 200, message: "Comment Posted" };
    return { status: 403, message: "Failed to post comment" };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403, data: undefined };
    const res = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        image: true,
      },
    });
    if (res) return { status: 200, data: res };
    return { status: 403, data: undefined };
  } catch (error) {
    console.log(error);
    return { status: 500, data: undefined };
  }
};

export const getVideoComments = async (id: string) => {
  try {
    const res = await db.comment.findMany({
      where: {
        OR: [
          {
            videoId: id,
          },
          {
            commentId: id,
          },
        ],
        commentId:null,
      },
     include:{
      reply:{
        include:{
          User:true
        },
      },
      User:true
     }
    });
    if (res && res.length) return { status: 200, data: res };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
