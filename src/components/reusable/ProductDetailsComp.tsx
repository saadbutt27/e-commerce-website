"use client";
import React, { useState } from "react";
import { IProduct } from "@/lib/types";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Button } from "../ui/button";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

export default function ProductDetailsComp({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { cartCount, setCartCount } = useCart();
  const [requireSize, setRequireSize] = useState<string>();

  const notify = (message: string) =>
    toast.success(message, {
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
    if (!requireSize) toast.error("Please select a size!");
    else {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
          method: "POST",
          body: JSON.stringify({
            product_id: product._id,
            quantity: quantity,
            size: requireSize,
          }),
        });

        const result = await res.json();
        if (res.ok && result.res !== false) {
          notify("Product has been added to cart.");
        } else {
          const res = await fetch(
            process.env.NEXT_PUBLIC_SITE_URL + "api/cart",
            {
              method: "PUT",
              body: JSON.stringify({
                product_id: product._id,
                quantity: quantity,
              }),
            }
          );

          const result = await res.json();
          notify("Cart has been updated.");
        }
        setCartCount((prevCount: number) => prevCount + quantity);
      } catch (error) {
        console.log("Error adding to cart:", error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:items-center md:space-x-10 space-y-10 md:space-y-0">
      <Image
        src={urlForImage(product.image).url()}
        alt="product1"
        width={300}
        height={400}
        className="object-cover object-top"
      />
      <div className="flex flex-col space-y-8">
        <div>
          <h3 className="text-2xl font-semibold">{product.title}</h3>
          <p className="text-lg font-semibold text-gray-400">{product.type}</p>
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold">Select size</p>
          <div>
            {product.sizes ? (
              product.sizes.map((size, index) => (
                <Button
                  onClick={() => setRequireSize(size)}
                  key={index}
                  className="hover:bg-gray-100 rounded-full hover:rounded-full text-gray-600 duration-300 hover:shadow-lg"
                >
                  {size}
                </Button>
              ))
            ) : (
              <p className="text-base font-semibold text-red-500">Not Available</p>
            )}
          </div>
        </div>
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
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
