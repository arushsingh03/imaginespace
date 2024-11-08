import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/supabase_client";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature");
  if (!sig) {
    console.log("NO Signature");
    return NextResponse.json({ error: "NO Signature" });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionData = event.data.object;
      await supabase
        .from("subscriptions")
        .insert([
          {
            sub_id: subscriptionData.id,
            user_id: subscriptionData.metadata.userId,
          },
        ])
        .select();
      break;
  }
  return NextResponse.json({ received: true });
}
