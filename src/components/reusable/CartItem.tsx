import React from "react";
import Image from "next/image";
import Prom3 from "../../../public/product3.jpg";
import Quantity from "@/components/reusable/quantity";
import { CalendarClock } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function CartItem() {
  return (
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
            <h3 className="text-2xl font-semibold">product title</h3>
            <p className="text-lg font-semibold text-gray-400">product type</p>
          </div>
          <Trash2 className="justify-self-end" />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <p className="text-base font-semibold">Price: $product price</p>
          <div className="order-1 md:order-last">
            <Quantity />
          </div>
        </div>
        <p className="space-y-2 text-base font-semibold">Size: product size</p>
        <div className="inline-flex space-x-2">
          <CalendarClock /> <p>Shipment in 1 week</p>
        </div>
      </div>
    </div>
  );
}
