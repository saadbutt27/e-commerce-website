"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Image as IImage } from "sanity";
import { useState, useContext } from "react";
import { CartContext } from "@/components/context/CartContext";
interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
  type: string;
  sizes: string[];
}

export default function Q_A(item: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
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

  const handleAddToCart = async () => {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item.product._id,
        quantity: quantity,
      }),
    });

    const result = await res.json();
    console.log("QA Component ", result);
    if (result.res) {
      notify("Product has been added to cart.");
      setCartCount((prevCount: number) => prevCount + quantity);
    } else {
      console.log("update now");
      const res = await fetch("http://localhost:3000/api/cart", {
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
