import React from "react";
import Image from "next/image";
import Prom3 from "../../../public/product3.jpg";
import Quantity from "@/components/reusable/quantity";
import { CalendarClock } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/reusable/CartItem";

import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <section>
      <h2 className="text-4xl font-bold">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row lg:justify-around lg:items-center mt-10 gap-y-4 gap-x-10">
        <div className="flex-[2_1_0%]">
          <div className="flex flex-col sm:flex-row gap-y-4 gap-x-10 border-b-2 border-b-gray-400 py-4">
            <Image
              src={Prom3}
              alt="product1"
              width={300}
              height={400}
              className="object-cover object-top"
            />
            <div className="w-full space-y-4">
              <div className="w-full grid grid-cols-2">
                <div>
                  <h3>product title</h3>
                  <p>product type</p>
                </div>
                <Trash2 className="justify-self-end" />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
                <p className="text-base font-semibold">Price: $product price</p>
                <div className="order-1 md:order-last">
                  <Quantity />
                </div>
              </div>
              <p className="space-y-2 text-base font-semibold">
                Size: product size
              </p>
              <div className="inline-flex space-x-2">
                <CalendarClock /> <p>Shipment in 1 week</p>
              </div>
            </div>
          </div>
          <CartItem />
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
                      $320
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
                      $67
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
      <div className="flex flex-col justify-between items-center gap-y-4 mt-10">
        <ShoppingCart className="w-32 h-32" />
        <h3 className="text-5xl font-bold">Your cart is empty!</h3>
      </div>
    </section>
  );
}
