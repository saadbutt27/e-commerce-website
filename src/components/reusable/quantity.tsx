"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  return (
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
  );
}
