"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AddToCart({ price }: { price: number }) {
  const { toast } = useToast();

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Product has been added to cart.",
          });
        }}
        className="flex justify-center items-center bg-black text-white py-3 gap-2"
      >
        <ShoppingCart />
        Add to Cart
      </Button>
      <p className="text-xl font-semibold">${price.toFixed(2)}</p>
    </div>
  );
}
