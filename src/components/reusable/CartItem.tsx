import React, { useState, useEffect } from "react";
import Image from "next/image";
import Quantity from "@/components/reusable/Quantity";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../../sanity/lib/image";
import toast from "react-hot-toast";
import { IProduct } from "@/lib/types";
import { useCart } from "@/components/context/CartContext";

export default function CartItem(props: {
  product_id: string;
  quantity: number;
  size: string;
  updateSubtotal: (subtotal: number) => void; // Callback function
  updateDeleteCall: (a: number) => void; // Callback function
}) {
  const { cartCount, setCartCount } = useCart();
  const [product, setProduct] = useState<IProduct[]>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="product" && _id == "${props.product_id}"] {
      price, 
      _id,
      title,
      type,
      image,
      description,
      sizes[],
      category -> {
        name
      }
    }`
      )
      .then((res) => res)
      .then((data) => {
        setProduct((prev) => data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (product) {
      const itemSubTotal = product[0].price * props.quantity;
      props.updateSubtotal(itemSubTotal); // Call the function to update subtotal
    }
  }, [product, props.quantity]);

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
        `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?product_id=${props.product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          props.updateDeleteCall(1);
          notify("Product has been deleted from cart.");
          setCartCount((prevCount: number) => prevCount - props.quantity);
        })
        .catch((error) => {
          console.log("Error deleting data:", error);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  if (product) {
    return (
      <div className="flex flex-col sm:flex-row gap-y-4 gap-x-10 border-b-2 border-b-gray-400 py-4">
        <Image
          src={urlForImage(product[0].image).url()}
          alt="product1"
          width={400}
          height={300}
          className="max-h-[300px] min-w-[100px] object-cover object-top"
        />
        <div className="w-full space-y-4">
          <div className="w-full grid grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">{product[0].title}</h3>
              <p className="text-lg font-semibold text-gray-400">
                {product[0].type}
              </p>
            </div>
            <Button onClick={hadleDelete} className="justify-self-end">
              <Trash2 />
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-baseline justify-between">
            <p className="text-base font-semibold">
              Price: ${product[0].price.toFixed(2)}
            </p>
            <div className="order-1 md:order-last">
              <Quantity q={props.quantity} />
            </div>
          </div>
          <p className="space-y-2 text-base font-semibold">
            Size: {props.size}
          </p>
          <div className="inline-flex space-x-2">
            <CalendarClock /> <p>Shipment in 1 week</p>
          </div>
        </div>
      </div>
    );
  }
}
