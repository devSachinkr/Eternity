"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const acceptInvite = async ({ inviteId }: { inviteId: string }) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
      };
    }
    const invite = await db.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workSpaceId: true,
        reciever: {
          select: {
            clerkId: true,
          },
        },
      },
    });
    if (!invite) {
      return {
        status: 404,
      };
    }
    if (user.id !== invite.reciever?.clerkId) {
      return {
        status: 403,
      };
    }
    const membersTransaction = await db.$transaction([
        db.invite.update({
          where: {
            id: inviteId,
          },
          data: {
            accepted: true,
          },
        }),
        db.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            members: {
              create: {
                workSpaceId: invite.workSpaceId,
              },
            },
          },
        }),
      ]);
    if (membersTransaction) {
      return {
        status: 200,
      };
    }
    return {
      status: 500,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
};
