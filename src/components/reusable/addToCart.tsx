"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { IProduct } from "@/lib/types";


export default function AddToCart(
  item: { product: IProduct },
  quantity: { quantity: number }
) {
  const notify = () =>
    toast("Product has been added to cart.", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "☑️",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  console.log("quantity ", quantity.quantity);
  const handleAddToCart = async () => {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item.product._id,
        quantity: quantity.quantity,
      }),
    });

    const result = await res.json();
    console.log(result);

    notify();
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={handleAddToCart}
        className="flex justify-center items-center bg-black text-white py-3 gap-2"
      >
        <ShoppingCart />
        Add to Cart
      </Button>
      <p className="text-xl font-semibold">${item.product.price.toFixed(2)}</p>
    </div>
  );
}
