"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/reusable/CartItem";
import { ShoppingCart } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { Product } from "@/lib/types";

export default function Cart() {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>();
  const [deleteCall, setDeleteCall] = useState(0);
  const [check, setCheck] = useState(false);
  const deliveryCharges = 5;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => data);
        // console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [deleteCall]);

  const handleDeleteCall = (a: number, price: number, quantity: number) => {
    setDeleteCall((prevSubTotal) => prevSubTotal + a);
    const amount = price * quantity;
    setSubTotal((prevSubTotal) => prevSubTotal - amount);
  };

  const handleCheckOut = async (len: number) => {
    setCheck(!check);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_SITE_URL + "api/checkout",
        {
          method: "POST",
          body: JSON.stringify({
            order_delivery_charges: deliveryCharges * len * 100,
            order_amount: subTotal + deliveryCharges * len,
            products: products,
          }),
        }
      );
      if (!res.ok) {
        setCheck(false);
        return toast.error("Failed to create an order.");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.log("Eror here:", error);
    }
  };

  if (products) {
    return (
      <section>
        <h2 className="text-4xl font-bold">Shopping Cart</h2>
        {products.length > 0 ? (
          <div className="flex flex-col xl:flex-row lg:justify-around lg:items-start mt-10 gap-y-4 gap-x-10">
            <div className="flex-[2_1_0%]">
              {products.map((product) => (
                <CartItem
                  key={product.product_id}
                  product_id={product.product_id}
                  quantity={product.quantity}
                  size={product.size}
                  updateDeleteCall={handleDeleteCall}
                  setTotalPrice={setSubTotal}
                />
              ))}
            </div>

            <div className="w-full flex-1 shadow-lg rounded-xl bg-black text-white p-3">
              <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
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
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 duration-700 ease-in-out">
                          ${subTotal.toFixed(2)}
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
                          ${(deliveryCharges * products.length).toFixed(2)}
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
                          $
                          {(
                            subTotal +
                            deliveryCharges * products.length
                          ).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Button
                    onClick={() => handleCheckOut(products.length)}
                    className="bg-black text-white text-lg w-full rounded-xl"
                    disabled={check}
                  >
                    {check ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        <>Please wait</>
                      </>
                    ) : (
                      <>Checkout</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center gap-y-4 mt-10">
            <ShoppingCart className="w-32 h-32" />
            <h3 className="text-3xl sm:text-5xl font-bold">
              Your cart is empty!
            </h3>
          </div>
        )}
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-4xl font-bold">Shopping Cart</h2>
      <div className="text-center mt-32">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </section>
  );
}
