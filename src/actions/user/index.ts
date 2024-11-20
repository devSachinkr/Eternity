"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { sendMail } from "../mail";

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
    if (!user) return { status: 403, data: [] };
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
    return { status: 403, data: [] };
  } catch (error) {
    console.log(error);
    return { status: 500, data: [] };
  }
};

export const inviteMembers = async (
  workspaceId: string,
  data: { receiverId: string; email: string; receiverName?: string }
) => {
  if (!data.receiverId) {
    console.log("❌");
    return;
  }
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const senderInfo = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    if (senderInfo?.id) {
      const workspaceInfo = await db.workSpace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
        },
      });
      if (workspaceInfo) {
        const invitation = await db.invite.create({
          data: {
            senderId: senderInfo.id,
            recieverId: data.receiverId,
            workSpaceId: workspaceId,
            content: `${senderInfo.firstname} ${senderInfo.lastname} invited you to join ${workspaceInfo.name} workspace. click accept to join the workspace`,
          },
          select: {
            id: true,
          },
        });

        await db.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            notification: {
              create: {
                content: `${senderInfo.firstname} ${
                  senderInfo.lastname
                } invited ${data.receiverName || data.email}  to join ${
                  workspaceInfo.name
                } workspace.`,
              },
            },
          },
        });

        if (invitation) {
          const { transporter, payload } = await sendMail({
            to: data.email,
            subject: "Invitation to join workspace",
            text: `${senderInfo.firstname} ${senderInfo.lastname} invited you to join ${workspaceInfo.name} workspace. click accept to join the workspace`,
            html: `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accept Invitation</a>`,
          });
          transporter.sendMail(payload, async (error, info) => {
            if (error) {
              console.log("Email error 🔴: ", error);
            } else {
              console.log("Email sent 🟢: ", info);
            }
          });
          return { status: 200, message: "Invitation sent successfully" };
        }
        return { status: 403, message: "Failed to send invitation" };
      }
      return { status: 403, message: "Failed to get workspace info" };
    }
    return { status: 403, message: "Failed to get sender info" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal server error" };
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
    if (commentId) {
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
    }
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
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });
    if (res) return { status: 200, data: res };
    return { status: 403 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
