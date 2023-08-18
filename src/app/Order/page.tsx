"use client";
import React from "react";
import { stripe } from "@/lib/stripe";
import toast from "react-hot-toast";
import { useCart } from "@/components/context/CartContext";

type Product = {
  id: number;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
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
  sessionId: string,
  amount: number,
  user_id: string
) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session && session.status === "complete") {
    const products: Product[] = await getProducts(user_id);
    console.log("products:", products);
    try {
      if (products.length === 0) throw new Error("error");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/order?user_id=${user_id}`,
        {
          method: "POST",
          body: JSON.stringify({
            order_amount: amount,
            products: products,
          }),
        }
      );
      if (!res.ok) {
        return toast.error("Failed to create an order.");
      }
      console.log(await res.json());

      return session;
    } catch (error) {
      console.log("Error here:", error);
    }
  }
};

export default function Order({
  searchParams,
}: {
  searchParams: {
    user_id: string;
    amount: number;
    success?: boolean;
    session_id: string;
  };
}) {
  const { cartCount, setCartCount } = useCart();
  console.log(searchParams);
  if (searchParams.success) {
    const sessionId = searchParams.session_id;

    if (!sessionId) throw new Error("Invalid Callback");

    const myFunc = async () => {
      const session = await getSessionAndOrder(
        sessionId,
        searchParams.amount,
        searchParams.user_id
      );
      if (session) {
        setCartCount((prevCount: number) => {
          console.log(prevCount);
          0;
          console.log(prevCount);
        });
        console.log("done");
      }
    };
    myFunc()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <section>
      <h2 className="text-4xl font-bold">Your order has been placed!</h2>
    </section>
  );
}
