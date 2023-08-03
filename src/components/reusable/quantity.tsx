"use client";
import React from "react";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/components/context/CartContext";

export default function Quantity({ q }: { q: number | null }) {
  const [quantity, setQuantity] = useState(q || 1);
  const { cartCount, setCartCount } = useContext(CartContext);

  const handleQuantityCount = async (action: string) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
      setCartCount((prevCount: number) => prevCount + 1);
    } else if (action === "decrement" && quantity !== 1) {
      setQuantity(quantity - 1);
      setCartCount((prevCount: number) => prevCount - 1);
    }
  };
  return (
    <div className="flex items-center justify-between space-y-2">
      <p className="text-base font-semibold">Quantity</p>
      <div className="flex-1 flex items-center justify-evenly">
        <Button
          onClick={() => handleQuantityCount("decrement")}
          className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
        >
          -
        </Button>
        <p>{quantity}</p>
        <Button
          onClick={() => handleQuantityCount("increment")}
          className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
        >
          +
        </Button>
      </div>
    </div>
  );
}
