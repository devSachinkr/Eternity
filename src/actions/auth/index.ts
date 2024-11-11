"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthUser = async () => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: 403,
      };
    const userData = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });
    if (!userData) {
      const newUser = await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstname: user.firstName,
          lastname: user.lastName,
          image: user.imageUrl,
          studio: { create: {} },
          subscription: { create: {} },
          workspace: {
            create: {
              name: `${user.firstName}'s Workspace`,
              type: "PERSONAL",
            },
          },
        },
        include: {
          workspace: true,
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      });
      if (newUser) {
        return { status: 201, user: newUser };
      }
      return { status: 400 };
    } else {
      return { status: 200, user: userData };
    }
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
