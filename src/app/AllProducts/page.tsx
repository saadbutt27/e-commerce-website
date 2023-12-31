import React from "react";
import Product from "@/components/reusable/Product";
import { client } from "@/lib/sanityClient";
import { IProduct } from "@/lib/types";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
    "slug":slug.current,
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

export default async function AllProducts() {
  const data: IProduct[] = await getProductData();

  return (
    <section>
      <h1 className="capitalize text-5xl text-center font-bold mb-10">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-10">
        {data.map((product, index) => (
          <Product
            key={product._id + index}
            imgSrc={product.image}
            productName={product.title}
            productPrice={product.price}
            productId={product._id}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  );
}
