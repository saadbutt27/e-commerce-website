import React from "react";
import Image from "next/image";
import Quantity from "@/components/reusable/quantity";
import { CalendarClock } from "lucide-react";
import DeleteComp from "./DeleteComp";
import { Image as IImage } from "sanity";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../../sanity/lib/image";

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

const getProductData = async (id: string) => {
  const res = await client.fetch(`*[_type=="product" && _id == "${id}"] {
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
    }`);
  return res;
};

export default async function CartItem({
  product_id,
  quantity,
  size,
}: {
  product_id: string;
  quantity: number;
  size: string;
}) {
  const product: IProduct[] = await getProductData(product_id);
  // console.log("quantity", quantity)
  return (
    <div className="flex flex-col sm:flex-row gap-y-4 gap-x-10 border-b-2 border-b-gray-400 py-4">
      <Image
        src={urlForImage(product[0].image).url()}
        alt="product1"
        width={200}
        height={200}
        className="object-cover object-top"
      />
      <div className="w-full space-y-4">
        <div className="w-full grid grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">{product[0].title}</h3>
            <p className="text-lg font-semibold text-gray-400">
              {product[0].type}
            </p>
          </div>
          <DeleteComp product_id={product_id} />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <p className="text-base font-semibold">
            Price: ${product[0].price.toFixed(2)}
          </p>
          <div className="order-1 md:order-last">
            <Quantity q={quantity} />
          </div>
        </div>
        <p className="space-y-2 text-base font-semibold">Size: {size}</p>
        <div className="inline-flex space-x-2">
          <CalendarClock /> <p>Shipment in 1 week</p>
        </div>
      </div>
    </div>
  );
}
