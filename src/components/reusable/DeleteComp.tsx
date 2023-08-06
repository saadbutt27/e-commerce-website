"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "@/components/context/CartContext";

export default async function DeleteComp({
  product_id,
  quantity,
}: {
  product_id: string;
  quantity: number;
}) {
  const { cartCount, setCartCount } = useContext(CartContext);
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

  const hadleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart?product_id=${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Deleteion Failed!");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Button onClick={hadleDelete} className="justify-self-end">
      <Trash2 />
    </Button>
  );
}
