import { NextRequest, NextResponse } from "next/server";
import { db, orderTable, orderDetailsTable } from "@/lib/drizzle";
import { formatDateTime } from "@/lib/dateFormatter";
import { Product } from "@/lib/types";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const req = request.nextUrl;
  const uid = req.searchParams.get("user_id") as string;

  console.log("user id ", uid);
  console.log(body);
  try {
    // make a order record in the database
    let res;
    res = await db
      .insert(orderTable)
      .values({
        user_id: uid,
        order_date: formatDateTime(new Date().toString()),
        order_amount: body.order_amount,
      })
      .returning();
    // console.log(res);
    const order = res;
    // make order details in database
    if (order) {
      // console.log("Cart Items:", body.products);
      let cartItems = body.products.map((product: Product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
        size: product.size,
        order_id: order[0].order_id,
      }));
      console.log(cartItems);
      res = await db.insert(orderDetailsTable).values(cartItems).returning();
      // console.log(res);
    }
    // clear the cart
    if (res.length === 0) {
      throw new Error("Failed");
    }
    const res_del = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${uid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res_del.ok) throw new Error("Deletion failed.");
    // console.log(res_del.status);

    return NextResponse.json(res);
  } catch (error) {
    console.log("Something went wrong,", error);
  }
};
