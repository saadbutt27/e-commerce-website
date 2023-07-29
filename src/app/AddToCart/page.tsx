import React from "react";

import { ShoppingCart } from "lucide-react";

export default function page() {
  return (
    <section>
      <h2 className="text-4xl font-bold">Shopping Cart</h2>
      <div className="flex flex-col justify-between items-center gap-y-4 mt-10">
        <ShoppingCart className="w-32 h-32" />
        <h3 className="text-5xl font-bold">Your cart is empty!</h3>
      </div>
    </section>
  );
}
