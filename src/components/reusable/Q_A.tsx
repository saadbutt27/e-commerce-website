"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { CartContext } from "@/components/context/CartContext";
import { IProduct } from "@/lib/types";


export default function Q_A(item: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { cartCount, setCartCount } = useContext(CartContext);
  // console.log("Cart Items Count:", cartCount);

  const notify = (message: string) =>
    toast(message, {
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

  const handleAddToCart = async () => {
    console.log(process.env.NEXT_PUBLIC_SITE_URL + "api/cart");
    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item.product._id,
        quantity: quantity,
      }),
    });

    const result = await res.json();

    // console.log(res.ok);
    // console.log("QA Component ", result);
    // console.log(result);
    if (res.ok && result.res !== false) {
      notify("Product has been added to cart.");
    } else {
      // console.log("update now");
      const res = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          product_id: item.product._id,
          quantity: quantity,
        }),
      });

      const result = await res.json();
      notify("Cart has been updated.");
      console.log("PUT ", result);
    }
    setCartCount((prevCount: number) => prevCount + quantity);
  };
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <p className="text-base font-semibold">Quantity</p>
        <div className="flex-1 flex items-center justify-evenly">
          <Button
            onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
            className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
          >
            -
          </Button>
          <p>{quantity}</p>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={handleAddToCart}
          className="flex justify-center items-center bg-black text-white py-3 gap-2"
        >
          <ShoppingCart />
          Add to Cart
        </Button>
        <p className="text-xl font-semibold">
          ${item.product.price.toFixed(2)}
        </p>
      </div>
    </>
  );
}
