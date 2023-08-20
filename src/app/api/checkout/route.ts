import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";

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

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const user_id = cookies().get("user_id")?.value as string;
  // console.log(body);
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
    // console.log("cart item details:", cartItemDetails);
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: cartItemDetails.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [urlForImage(item.image).url()],
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
              maximum: { unit: "week", value: 2 },
              minimum: { unit: "business_day", value: 5 },
            },
            fixed_amount: {
              amount: body.order_delivery_charges,
              currency: "usd",
            },
          },
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}Order?user_id=${user_id}&amount=${body.order_amount}&success=true&session_id={CHECKOUT_SESSION_ID}`, // where we want to go to when checkout is successfully completed
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}Cart?cancelled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log("Something went wrong,", error);
  }
};
