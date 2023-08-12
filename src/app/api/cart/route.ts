import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 as randomIdGenerator } from "uuid";
import { cookies } from "next/headers";
import { eq, and, sql } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const uid = req.searchParams.get("user_id") as string;

  let user_id = !uid ? cookies().get("user_id")?.value : uid;
  // console.log("user id ", user_id);

  try {
    if (user_id) {
      const res = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, user_id));
      // console.log("api", res);
      return NextResponse.json(res);
    } else {
      // console.log("fail");
      return NextResponse.json({ res: false });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  const uid = randomIdGenerator();
  const setCookies = cookies();

  const user_id = cookies().get("user_id");

  if (!user_id) {
    setCookies.set("user_id", uid);
  }
  // console.log("q ", req.product_id, req.quantity);
  let u_id = cookies().get("user_id")?.value as string;
  let res;
  try {
    res = await db
      .select()
      .from(cartTable)
      .where(
        and(
          eq(cartTable.product_id, req.product_id),
          eq(cartTable.user_id, u_id)
        )
      );
    // console.log("API ", res, res.length);
    if (res.length === 0) {
      // console.log("q ", req.product_id, req.quantity);
      res = await db
        .insert(cartTable)
        .values({
          product_id: req.product_id,
          quantity: req.quantity,
          user_id: cookies().get("user_id")?.value as string,
          size: "L",
        })
        .returning();
    } else {
      return NextResponse.json({ res: false });
    }
    // console.log("In api", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (request: NextRequest) => {
  const req = await request.json();
  let uid = cookies().get("user_id")?.value as string;

  try {
    const res = await db
      .update(cartTable)
      .set({
        quantity: sql`${cartTable.quantity} + ${req.quantity}`,
      })
      .where(
        and(
          eq(cartTable.product_id, req.product_id),
          eq(cartTable.user_id, uid)
        )
      )
      .returning();
    // console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  // console.log("Hello from DELETE");
  const req = request.nextUrl;
  const product_id = req.searchParams.get("product_id") as string;
  // const req = await request.json();
  let uid = cookies().get("user_id")?.value as string;
  // console.log(product_id, uid);
  try {
    const res = await db
      .delete(cartTable)
      .where(
        and(eq(cartTable.product_id, product_id), eq(cartTable.user_id, uid))
      )
      .returning();
    // console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
