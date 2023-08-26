import { NextRequest, NextResponse } from "next/server";
import { db, orderTable, orderDetailsTable } from "@/lib/drizzle";
import { formatDateTime } from "@/lib/dateFormatter";
import { Product } from "@/lib/types";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const uid = body.products[0].user_id;

  try {
    // make a order record in the database
    let res;
    res = await db
      .insert(orderTable)
      .values({
        user_id: uid,
        order_date: formatDateTime(new Date().toString()),
        order_amount: body.order_amount,
        delivery_charges: body.order_delivery_charges,
      })
      .returning();
    const order = res;
    // console.log("Order:", order);
    // make order details in database
    if (order) {
      let cartItems = body.products.map((product: Product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
        size: product.size,
        order_id: order[0].order_id,
      }));
      res = await db.insert(orderDetailsTable).values(cartItems).returning();
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log("Something went wrong,", error);
  }
};
