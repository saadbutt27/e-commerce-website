import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const createOrder = async (products: Product[], amount: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/order`, {
      method: "POST",
      body: JSON.stringify({
        order_amount: amount,
        products: products,
      }),
    });
    if (!res.ok) throw new Error("Can't make order.");
    return res;
  } catch (error) {
    console.log("Error here:", error);
  }
};

export async function POST(request: Request) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log("weebhook verified");
  } catch (err: any) {
    console.log("weebhook failed");
    NextResponse.json(`Webhook Error: ${err.message}`);
    return;
  }

  // const event = stripe.webhooks.constructEvent(body, signature, secret);

  switch (event?.type) {
    case "payment_intent.succeeded":
      const paymentIntentSuccess = event.data.object;
      break;
    // ... handle other event types
    case "checkout.session.completed":
      console.log("session completed");
      const paymentIntent: any = event.data.object;
      const customer: any = await stripe.customers.retrieve(
        paymentIntent.customer
      );
      console.log("Customer:", customer);
      const order = await createOrder(
        JSON.parse(customer.metadata.cartItems),
        customer.metadata.total_amount
      );
      if (!order?.ok) throw new Error("error making order");
    // console.log("OrderW:", order);
    default:
      console.log(`Unhandled event type ${event?.type}`);
  }

  // if (event.type === "checkout.session.completed") {
  //   console.log("session completed");
  //   const customer = await stripe.customers.retrieve(
  //     event.data.object.customer
  //   );
  //   const order = await createOrder(
  //     JSON.parse(customer.metadata.cartItems),
  //     customer.metadata.total_amount
  //   );
  //   if (!order?.ok) throw new Error("error making order");
  // }
  return NextResponse.json({ result: event, ok: true });
}
