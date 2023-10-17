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
  const [quantity, setQuantity] = useState(1); // state to track quantity changes
  const { setCartCount } = useCart(); // context api's state to change cartCount state globally
  const [requireSize, setRequireSize] = useState<string>(); // size state
  const [check, setCheck] = useState(false);

  const handleAddToCart = async () => {
    setCheck(!check);
    // This function will insert an item to cart table in the databse, quantity and size is required
    // Toast notifications are used which will show loader and on sucess show show success notification
    // Cart count will be updated to the quantity added to previous cart count
    if (!requireSize) {
      toast.error("Please select a size!");
      setCheck(false);
    } else {
      const mySize = requireSize;
      setRequireSize("");
      try {
        const toastId = toast.loading("Adding to cart...");
        const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
          method: "POST",
          body: JSON.stringify({
            product_id: product._id,
            quantity: quantity,
            size: mySize,
          }),
        });

        if (!res.ok) throw new Error("error insertion");

        // const result = await res.json();
        // console.log(result);
        toast.success("Product has been added to cart", {
          id: toastId,
        });
        setCartCount((prevCount: number) => prevCount + quantity);
        setRequireSize("");
        setCheck(false);
      } catch (error) {
        console.log("Error adding to cart:", error);
        setRequireSize("");
        setCheck(false);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:items-center sm:space-x-10 space-y-10 sm:space-y-0">
      <Image
        src={urlForImage(product.image).url()}
        alt="product1"
        width={300}
        height={400}
        className="object-cover h-[430px] w-full sm:w-[300px]"
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
              <p className="text-base font-semibold text-red-500">
                Not Available
              </p>
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
            className={`flex justify-center items-center bg-black text-white py-3 gap-2 ${
              check ? "cursor-not-allowed pointer-events-none" : ""
            }`}
            disabled={check}
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
