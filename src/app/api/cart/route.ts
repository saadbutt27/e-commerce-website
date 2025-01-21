import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 as randomIdGenerator } from "uuid";
import { cookies } from "next/headers";
import { eq, and, sql } from "drizzle-orm";
import { getSession } from "@/lib/serverLib";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const uid = req.searchParams.get("user_id") as string;

  let user_id = !uid ? cookies().get("user_id")?.value : uid;
  // console.log("user id ", user_id)

  try {
    if (user_id) {
      const res = await db
        .select()
        .from(cartTable)
        .where(and(
          eq(cartTable.user_id, user_id),
          eq(cartTable.is_deleted, false)
        ));
      // console.log("api", res);
      return NextResponse.json(res);
    }
    return NextResponse.json({ message: "Cart is empty." });
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

  const session = await getSession()
  let userEmail:string | null = null;
  if (session)
    userEmail = session.user.email
  // console.log("q ", req.product_id, req.quantity);
  // let u_id = cookies().get("user_id")?.value as string;
  try {
    const res = await db
      .insert(cartTable)
      .values({
        product_id: req.product_id,
        quantity: req.quantity,
        user_id: cookies().get("user_id")?.value as string,
        size: req.size,
        email: userEmail,
      })
      .onConflictDoUpdate({
        target: [cartTable.user_id, cartTable.product_id, cartTable.size],
        set: { 
          quantity: sql`${cartTable.is_deleted ? 0 : cartTable.quantity}::integer + ${req.quantity}::integer`, 
          is_deleted: false 
        },        
      })
      .returning();
    // console.log("Inserted:", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const PUT = async (request: NextRequest) => {
  const req = await request.json();
  let uid = cookies().get("user_id")?.value as string;

  try {
    const res = await db
      .update(cartTable)
      .set({
        quantity:
          req.action !== "update"
            ? sql`${cartTable.quantity} + ${req.quantity}`
            : req.quantity,
      })
      .where(
        and(
          eq(cartTable.product_id, req.product_id),
          eq(cartTable.user_id, uid),
          eq(cartTable.size, req.size)
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
  // console.log("deleting")
  const req = request.nextUrl;
  const product_id = req.searchParams.get("product_id") as string;
  const size = req.searchParams.get("size") as string;
  const u_id = req.searchParams.get("user_id") as string;
  const uid = cookies().get("user_id")?.value as string;

  try {
    // let res;
    // if (product_id) {
    //   console.log(product_id);
    //   res = await db
    //     .delete(cartTable)
    //     .where(
    //       and(
    //         eq(cartTable.product_id, product_id),
    //         eq(cartTable.user_id, uid),
    //         eq(cartTable.size, size)
    //       )
    //     )
    //     .returning();
    // } else {
    //   res = await db
    //     .delete(cartTable)
    //     .where(eq(cartTable.user_id, u_id))
    //     .returning();
    // }
    const res = await db
      .update(cartTable)
      .set({ is_deleted: true }) // soft delete
      .where(
        and(
          eq(cartTable.product_id, product_id),
          eq(cartTable.user_id, uid || u_id),
          eq(cartTable.size, size)
        )
      )
      .returning();
      // console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
