import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
  if (!priceId) {
    return NextResponse.json({ status: 500, message: "Price ID is not set" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
    line_items: [{ price: priceId, quantity: 1 }],
  });
  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
      customer_id: session.customer,
    });
  }
  return NextResponse.json({
    status: 500,
    message: "Failed to create session",
  });
}
