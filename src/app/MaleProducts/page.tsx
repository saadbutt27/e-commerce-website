import React from "react";
import Product from "@/components/reusable/Product";
import { client } from "@/lib/sanityClient";
import { IProduct } from "@/lib/types";

const getProductData = async () => {
  const res =
    await client.fetch(`*[_type=="product" && category->name == 'Male'] {
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

export default async function MaleProducts() {
  const data: IProduct[] = await getProductData();

  return (
    <section>
      <h1 className="capitalize text-5xl text-center font-bold mb-10">
        Male Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-10">
        {data.map((product, index) => (
          <Product
            key={index}
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
