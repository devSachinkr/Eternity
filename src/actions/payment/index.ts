"use server";

import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export const completeSubscription = async ({
  session_id,
}: {
  session_id: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session) {
      const customer = await db.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              customerId: session.customer as string,
              plan: "PRO",
            },
          },
        },
      });
      if (customer) {
        return { status: 200 };
      }
      return { status: 404 };
    }
    return { status: 404 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
