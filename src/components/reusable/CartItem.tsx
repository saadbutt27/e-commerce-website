import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CalendarClock, ShoppingCart } from "lucide-react";
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
  updateDeleteCall: (a: number, price: number, quantity: number) => void; // Callback function
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setCartCount } = useCart();
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
      props.setTotalPrice(
        (prevTotal: number) => product[0].price * props.quantity + prevTotal
      );
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

  const handleDelete = async (price: number) => {
    try {
      const toastId = toast.loading("Deleting from cart...");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?product_id=${props.product_id}&size=${props.size}`,
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
          toast.success("Product has been deleted from cart", {
            id: toastId,
          });
          setCartCount((prevCount: number) => prevCount - props.quantity);
        })
        .catch((error) => {
          console.log("Error deleting data:", error);
        });
    } catch (error) {
      console.log("error: ", error);
      toast.error("Can't update!")
    }
  };

  const handleQuantityCount = (action: string, price: number) => {
    if (action === "increment") {
      setNewQuantity(newQuantity + 1);
      props.setTotalPrice((prevTotal: number) => prevTotal + price);
    } else if (action === "decrement" && newQuantity !== 1) {
      setNewQuantity(newQuantity - 1);
      props.setTotalPrice((prevTotal: number) => prevTotal + price);
    }
  };

  const handleQuantityUpdate = async (id: string, price: number) => {
    console.log(props.quantity, newQuantity, props.quantity === newQuantity);
    if (props.quantity === newQuantity) return;
    try {
      const toastId = toast.loading("Updating cart...");
      const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
        method: "PUT",
        body: JSON.stringify({
          product_id: id,
          quantity: newQuantity,
          size: props.size,
          action: "update",
        }),
      });

      const result = await res.json();
      props.updateDeleteCall(1, price, newQuantity);
      toast.success("Cart has been updated", {
        id: toastId,
      });
      setCartCount(
        (prevCount: number) => prevCount + (newQuantity - props.quantity)
      );
    } catch (error) {
      console.log(error);
      toast.error("Can't update!")
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
          className="max-h-[300px] min-w-[100px] object-cover object-top rounded-xl"
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
              onClick={() => handleDelete(product[0].price)}
              className="justify-self-end"
            >
              <Trash2 />
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-baseline justify-between">
            <p className="text-base font-semibold">
              Price: ${(product[0].price * newQuantity).toFixed(2)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 items-baseline justify-between gap-y-2.5 md:gap-y-0">
            <div className="inline-flex space-x-2">
              <CalendarClock /> <p>Shipment in 1 week</p>
            </div>
            <div className="flex-[2_1_0%] flex items-center lg:justify-around">
              <Button
                variant="outline"
                onClick={() =>
                  handleQuantityUpdate(product[0]._id, product[0].price)
                }
                className={`flex justify-center items-center bg-black text-white py-3 gap-2 ${
                  props.quantity === newQuantity
                    ? "pointer-events-none cursor-pointer"
                    : ""
                }`}
              >
                <ShoppingCart />
                Update Quantity
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
