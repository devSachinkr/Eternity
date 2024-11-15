"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getPreviewVideo = async ({ videoId }: { videoId: string }) => {
  if (!videoId) return { status: 400, data: null };
  try {
    const user = await currentUser();
    if (!user) return { status: 401, data: null };
    const res = await db.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        createdAt: true,
        source: true,
        processing: true,
        views: true,
        summery: true,
        id: true,
        title: true,
        description: true,
        User: {
          select: {
            image: true,
            firstname: true,
            lastname: true,
            clerkId: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });
    if (res)
      return {
        status: 200,
        data: res,
        author: user.id === res.User?.clerkId ? true : false,
      };
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};
