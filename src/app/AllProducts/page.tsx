import React from "react";
import Product from "../../components/reusable/product";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";

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
  id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
}

export default async function AllProducts() {
  const data: IProduct[] = await getProductData();

  return (
    <section className="mb-20">
      <h1 className="capitalize text-5xl text-center font-bold mb-10">
        Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10">
        {data.map((product, index) => (
          <Product
            key={index}
            imgSrc={urlForImage(product.image).url()}
            productName={product.title}
            productPrice={product.price}
          />
        ))}
      </div>
    </section>
  );
}