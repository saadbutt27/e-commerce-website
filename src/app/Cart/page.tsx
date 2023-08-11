"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/reusable/CartItem";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/lib/types";
import { client } from "@/lib/sanityClient";

const getProductData = async (id: string[]) => {
  const res = await client.fetch(`*[_type=="product" && _id in [${id}]] {
      price, 
      _id,
      title,
      type,
      image,
      description,
      sizes[],
      category -> {
        name
      }
    }`);
  return res;
};

async function getData() {
  try {
    console.log("getData called");
    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    const products = await res.json();
    if (products.res === false) return null;
    return products;
  } catch (error) {
    console.log("error: ", error);
  }
}

type Product = {
  id: number;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
};

export default async function Cart() {
  let products: Product[] = await getData();
  let subTotal = 10
  return (
    <section>
      <h2 className="text-4xl font-bold">Shopping Cart</h2>
      {products[0] ? (
        <div className="flex flex-col lg:flex-row lg:justify-around lg:items-start mt-10 gap-y-4 gap-x-10">
          <div className="flex-[2_1_0%]">
            {products.map((product, index) => (
              <CartItem
                key={index}
                product_id={product.product_id}
                quantity={product.quantity}
                size={product.size}
              />
            ))}
          </div>

          <div className="w-full flex-1 shadow-lg rounded-xl bg-black text-white p-3">
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Order Summary
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Subtotal
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ${subTotal + 0}
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Delivery Charges
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $10
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Order total
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ${subTotal + 10}
                      </div>
                    </div>
                  </li>
                </ul>
                <Button className="bg-black text-white text-lg w-full rounded-xl">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center gap-y-4 mt-10">
          <ShoppingCart className="w-32 h-32" />
          <h3 className="text-5xl font-bold">Your cart is empty!</h3>
        </div>
      )}
    </section>
  );
}
