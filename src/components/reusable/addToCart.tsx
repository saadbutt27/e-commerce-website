"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
// import { cookies } from "next/headers";
// import { v4 as randomIdGenerator } from "uuid";
import toast, { Toaster } from "react-hot-toast";

export default function AddToCart({
  id,
  price,
}: {
  id: string;
  price: number;
}) {
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

  // const handleAddToCart = () => {
  //   const uid = randomIdGenerator();
  //   const setCookies = cookies();

  //   const user_id = cookies().get("user_id");

  //   if (!user_id) {
  //     setCookies.set("user_id", uid);
  //   }
  //   setCookies.set("product_id", id);
  // };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={notify}
        className="flex justify-center items-center bg-black text-white py-3 gap-2"
      >
        <ShoppingCart />
        Add to Cart
      </Button>
      <p className="text-xl font-semibold">${price.toFixed(2)}</p>
    </div>
  );
}
