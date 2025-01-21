import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { stripe } from "@/lib/stripe";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import Stripe from "stripe";
import { Product } from "@/lib/types";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
  typescript: true,
});

type ProductData = {
  _id: string;
  title: string;
  price: number;
  image: IImage;
  alt: string;
  type: string;
  quantity: number;
};

const getData = async (id: string) => {
  try {
    const res = await client.fetch(
      `*[_type=="product" && _id == "${id}"] {
      price, 
      _id,
      title,
      type,
      image
    }`
    );
    if (!res) throw new Error("error");
    return res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};


const getProducts = async (user_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getSessionAndOrder = async (
  amount: number,
  delivery_charges: number,
  user_id: string
) => {
  // const session = await stripe.checkout.sessions.retrieve(sessionId);
  // console.log("MyProducts:", myProducts.data);
  // console.log("MyProducts:", myProducts.data[0].price?.metadata);

  // if (session && session.status === "complete") {
    const products: Product[] = await getProducts(user_id);
    // console.log("products:", products);
    try {
      if (products.length === 0) throw new Error("No products retrieved.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/order?user_id=${user_id}`,
        {
          method: "POST",
          body: JSON.stringify({
            order_amount: amount,
            order_delivery_charges: delivery_charges,
            products: products,
          }),
        }
      );
      // console.log("response:", res.ok);
      if (!res.ok) throw new Error("Can't make order.");
      // console.log("Status:", res.status);
      // return session;
    } catch (error) {
      console.log("Error here:", error);
    }
  // }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const user_id = cookies().get("user_id")?.value as string;
  try {
    // go to teh checkout page
    let cartItemDetails: ProductData[] = [];
    // Use a for...of loop to iterate through products
    for (const product of body.products) {
      // Assuming getData returns a Promise<ProductData[]>
      const data = await getData(product.product_id);

      // Assuming getData returns an array of data, but we only want the first item
      const [productData] = data;

      // Push the retrieved product data into the array
      cartItemDetails.push({
        ...productData,
        quantity: product.quantity,
      });
    }

    let amount: number = cartItemDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const customer = stripe.customers.create({
      metadata: {
        userId: user_id,
        cartItems: JSON.stringify(body.products),
        total_amount: cartItemDetails.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        delivery_charges: body.order_delivery_charges,
      },
    });
    // console.log("cart item details:", cartItemDetails);
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: cartItemDetails.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [urlForImage(item.image).url()],
            metadata: {
              product_id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Deliver Charges",
            type: "fixed_amount",
            delivery_estimate: {
              maximum: { unit: "business_day", value: 6 },
              minimum: { unit: "business_day", value: 2 },
            },
            fixed_amount: {
              amount: body.order_delivery_charges,
              currency: "usd",
            },
          },
        },
      ],
      billing_address_collection: "auto",
      metadata: { userId: user_id },
      payment_method_types: ["card"],
      submit_type: "pay",
      invoice_creation: { enabled: true },
      customer: (await customer).id,
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/?success=true&success_id=${user_id}`,
      cancel_url: `${request.headers.get("origin")}/Cart?cancelled=true`,
    });

    const resOrder = await getSessionAndOrder(amount, body.order_delivery_charges, user_id)

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log("Something went wrong,", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
