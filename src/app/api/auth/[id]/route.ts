import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  console.log("Endpoint hit 🟢");
  try {
    const user = await db.user.findUnique({
        where: { clerkId: id },
        include: {
          studio: true,
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      });
      if (user) {
        return  NextResponse.json({ status: 200, user });
      }
    //@ts-expect-error - Clerk types compatibility issue with user instance
      const userInstance = await clerkClient.users.getUser(id);
      const createUser = await db.user.create({
        data: {
          clerkId: id,
          email: userInstance.emailAddresses[0].emailAddress,
          firstname: userInstance.firstName,
          lastname: userInstance.lastName,
          studio: {
            create: {},
          },
          workspace: {
            create: {
              name: `${userInstance.firstName}'s Workspace`,
              type: "PERSONAL",
            },
          },
          subscription: {
            create: {},
          },
        },
        include: {
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      });
      if (createUser) {
        return NextResponse.json({ status: 201, user: createUser });
      }
      return NextResponse.json({ status: 404 });
  } catch (error) {
    console.log("🔴",error)
    return NextResponse.json({ status: 404 });
  }
}
