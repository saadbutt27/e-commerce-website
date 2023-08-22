import React from "react";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../sanity/lib/image";
import Product from "@/components/reusable/Product";
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

export default async function ProductsList() {
  const data1: IProduct[] = await getProductData();
  const data = data1.slice(0, 3);
  return (
    <section className="mb-20" id="products">
      <h3 className="uppercase text-base text-center mb-2 text-blue-700 font-semibold">
        Products
      </h3>
      <h1 className="capitalize text-4xl text-center font-semibold mb-10">
        check what we have
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-4">
        {data[0] &&
          data.map((product, index) => (
            <Product
              key={index}
              imgSrc={urlForImage(product.image).url()}
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
