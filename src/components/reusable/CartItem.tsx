import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  updateSubtotal: (subtotal: number, p: number, o: string) => void; // Callback function
  updateDeleteCall: (a: number, price: number, quantity: number) => void; // Callback function
}) {
  const { cartCount, setCartCount } = useCart();
  const [product, setProduct] = useState<IProduct[]>();
  const [newQuantity, setNewQuantity] = useState(props.quantity);

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
  }, [props.product_id]);

  useEffect(() => {
    if (product) {
      const itemSubTotal = product[0].price * props.quantity;
      props.updateSubtotal(itemSubTotal, 0, "none");
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

  const hadleDelete = async (price: number) => {
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
          console.log(data);
          props.updateDeleteCall(1, price, newQuantity);
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

  const handleQuantityCount = (action: string, price: number) => {
    if (action === "increment") {
      setNewQuantity(newQuantity + 1);
      props.updateSubtotal(0, price, "+");
      setCartCount((prevCount: number) => prevCount + 1);
    } else if (action === "decrement" && newQuantity !== 1) {
      setNewQuantity(newQuantity - 1);
      props.updateSubtotal(0, price, "-");
      setCartCount((prevCount: number) => prevCount - 1);
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
            <Button
              onClick={() => hadleDelete(product[0].price)}
              className="justify-self-end"
            >
              <Trash2 />
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-baseline justify-between">
            <p className="text-base font-semibold">
              Price: ${product[0].price.toFixed(2)}
            </p>
            <div className="order-1 md:order-last">
              <div className="flex items-baseline justify-between space-y-2">
                <p className="text-base font-semibold">Quantity</p>
                <div className="flex-[2_1_0%] flex items-center justify-around">
                  <Button
                    onClick={() =>
                      handleQuantityCount("decrement", product[0].price)
                    }
                    className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
                  >
                    -
                  </Button>
                  <p>{newQuantity}</p>
                  <Button
                    onClick={() =>
                      handleQuantityCount("increment", product[0].price)
                    }
                    className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
                  >
                    +
                  </Button>
                </div>
              </div>
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
