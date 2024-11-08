import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, { params }) {
  const id = params.id;
  try {
    const session = id.includes("sub")
      ? await stripe.subscriptions.retrieve(id)
      : await stripe.checkout.sessions.retrieve(id);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
