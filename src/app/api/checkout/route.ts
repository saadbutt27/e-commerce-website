import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, orderTable, orderDetailsTable } from "@/lib/drizzle";
import { formatDateTime } from "@/lib/dateFormatter";
import { stripe } from "@/lib/stripe";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";

type Product = {
  id: number;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
};
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
// export const POST = async (request: NextRequest) => {
//   const body = await request.json();
//   try {
//     let res;
//     res = await db.transaction(async (tx) => {
//       let a = await tx
//         .insert(orderTable)
//         .values({
//           user_id: cookies().get("user_id")?.value as string,
//           order_date: formatDateTime(new Date().toString()),
//           order_amount: body.order_amount,
//         })
//         .returning();

//       const order = a;
//       // make order details in database
//       let b;
//       if (order) {
//         let cartItems = body.products.map((product: Product) => ({
//           product_id: product.product_id,
//           quantity: product.quantity,
//           size: product.size,
//           order_id: order[0].order_id,
//         }));
//         console.log(cartItems);
//         b = await tx.insert(orderDetailsTable).values(cartItems).returning();
//       }

//       // clear the cart
//       if (b && b.length === 0) {
//         throw new Error("Failed");
//       }
//       console.log("TX 1:", a, " TX 2:", b);
//       const res_del = await fetch(
//         `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${
//           cookies().get("user_id")?.value as string
//         }`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!res_del.ok) throw new Error("Deletion failed.");
//     });

//     // go to teh checkout page
//     let cartItemDetails: ProductData[] = [];
//     // Use a for...of loop to iterate through products
//     for (const product of body.products) {
//       // Assuming getData returns a Promise<ProductData[]>
//       const data = await getData(product.product_id);
//       // Assuming getData returns an array of data, but we only want the first item
//       const [productData] = data;
//       // Push the retrieved product data into the array
//       cartItemDetails.push({
//         ...productData,
//         quantity: product.quantity,
//       });
//     }
//     const checkoutSession = await stripe.checkout.sessions.create({
//       line_items: cartItemDetails.map((item) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.title,
//             // images: urlForImage(item.image).url(),
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),
//       // metadata:{
//       //   userID
//       // },
//       shipping_rates: body.order_amount,
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SITE_URL}`, // where we want to go to when checkout is successfully completed
//       cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}Cart?cancelled=true`,
//     });

//     return NextResponse.json({ url: checkoutSession.url });
//   } catch (error) {
//     console.log("Something went wrong,", error);
//   }
// };

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
    console.log("cart item details:", cartItemDetails);
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: cartItemDetails.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            // images: urlForImage(item.image).url(),
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      // metadata:{
      //   userID
      // },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}Order?user_id=${user_id}&amount=${body.order_amount}&success=true&session_id={CHECKOUT_SESSION_ID}`, // where we want to go to when checkout is successfully completed
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}Cart?cancelled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log("Something went wrong,", error);
  }
};
