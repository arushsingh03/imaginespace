import url from "url"
import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const { email, userId } = await req.json()
    try {
        const { protocol, host } = url.parse(req.url)
        const baseUrl = `${protocol}//${host}`
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ["card"],
            subscription_data:{
                metadata:{
                    userId,
                }
            },
            subscription_data: {
                metadata: {
                    userId,
                }
            },
            line_items: [{ price: "price_1QIUE1JpnauogkQvH0XMBLt4", quantity: 1 }],
            mode: "subscription",
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cancel?session_id={CHECKOUT_SESSION_ID}`
        })
        return NextResponse.json(session, { status: 200 })
    }
    catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}