import { NextResponse } from "next/server";
import url from "url";
const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const { customer } = await req.json();
  try {
    const { protocol, host } = url.parse(req.url);
    const portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: baseUrl,
    });
    return NextResponse.json(portalSession);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
