"use client";
import React from "react";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../sanity/lib/image";
import Product from "@/components/reusable/Product";
import { IProduct } from "@/lib/types";
import { Carousel } from "@trendyol-js/react-carousel";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product" && is_main == true] {
    "slug":slug.current,
      price, 
      _id,
      title,
      image,
      is_main,
      alt,
      category -> {
        name
      }
    }`);
  return res;
};

export default async function ProductsList() {
  const data: IProduct[] = await getProductData();
  return (
    <section className="mb-20" id="products">
      <h3 className="uppercase text-base text-center mb-2 text-blue-700 font-semibold">
        Products
      </h3>
      <h1 className="capitalize text-4xl text-center font-semibold mb-10">
        check what we have
      </h1>
      <div className="flex flex-col justify-center select-none ml-4">
        <Carousel
          show={4}
          slide={2}
          swiping={true}
          useArrowKeys={true}
          swipeOn={0.3}
        >
          {data[0] &&
            data.map((product) => (
              <Product
                key={product._id}
                imgSrc={urlForImage(product.image).url()}
                productName={product.title}
                productPrice={product.price}
                productId={product._id}
                slug={product.slug}
              />
            ))}
        </Carousel>
      </div>
      <div className="flex justify-center my-5">
        <p className="text-center text-2xl border-b-2 border-gray-300 inline-block tracking-widest animate-[pulse_2s_ease-in-out_infinite] select-none">
          SWIPE TO EXPLORE
        </p>
      </div>
    </section>
  );
}
