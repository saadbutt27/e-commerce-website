import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Product } from "@/lib/types";

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const uid = searchParams.get("user_id") as string;
  const setCookies = cookies();

  const body = await request.json();

  let cartItems = body.products.map((product: Product) => ({
    product_id: product.product_id,
    size: product.size,
  }));

  try {
    cartItems.forEach(async (cartItems: {product_id: string, size: string}) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${uid}&product_id=${cartItems.product_id}&size=${cartItems.size}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.log("Error deleting data:", error);
        });
        });
  } catch (error) {
    console.log("error: ", error);
  }
        
  if (uid === setCookies.get("user_id")?.value) {
    // setCookies.delete("user_id");
    // console.log("cleared");
  }
  return NextResponse.json("success");
};
