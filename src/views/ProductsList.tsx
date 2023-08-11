import React from "react";
import Image from "next/image";
import P1 from "public/images/product1.png";
import P2 from "public/images/product2.png";
import P3 from "public/images/product3.png";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import Product from "@/components/reusable/Product";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
      price, 
      _id,
      title,
      image,
      alt,
      category -> {
        name
      }
    }`);
  return res;
};
interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
}

export default async function ProductsList() {
  const data1: IProduct[] = await getProductData();
  const data = data1.slice(0, 3);
  return (
    <section className="mb-20">
      <h3 className="uppercase text-base text-center mb-2 text-blue-700 font-semibold">
        Products
      </h3>
      <h1 className="capitalize text-4xl text-center font-semibold mb-10">
        check what we have
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
        {data[0] &&
          data.map((product, index) => (
            <Product
              key={index}
              imgSrc={urlForImage(product.image).url()}
              productName={product.title}
              productPrice={product.price}
              productId={product._id}
            />
          ))}
      </div>
    </section>
  );
}
