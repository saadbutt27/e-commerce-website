import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Quantity from "@/components/reusable/quantity";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import AddToCart from "@/components/reusable/addToCart";

interface IProduct {
  id: string;
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

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product: IProduct[] = await getProductData(params.slug);

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-center md:items-center md:space-x-10 space-y-10 md:space-y-0">
        <Image
          src={urlForImage(product[0].image).url()}
          alt="product1"
          width={300}
          height={400}
          className="object-cover object-top"
        />
        <div className="flex flex-col space-y-8">
          <div>
            <h3 className="text-2xl font-semibold">{product[0].title}</h3>
            <p className="text-lg font-semibold text-gray-400">
              {product[0].type}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-base font-semibold">Select size</p>
            <div>
              {product[0].sizes &&
                product[0].sizes.map((size, index) => (
                  <Button
                    key={index}
                    className="hover:bg-gray-100 rounded-full hover:rounded-full text-gray-600 duration-300 hover:shadow-lg"
                  >
                    {size}
                  </Button>
                ))}
            </div>
          </div>
          <Quantity />
          <AddToCart id={product[0].id} price={product[0].price} />
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-8">
        <h2 className="text-2xl font-bold border-b-2 border-b-gray-200 py-10">
          Product Information
        </h2>
        <div className="flex">
          <h4 className="flex-1 text-xl text-gray-600 font-semibold w-full">
            Product Details
          </h4>
          <p className="flex-[2_1_0%] text-justify">{product[0].description}</p>
        </div>
        <div className="flex">
          <h4 className="flex-1 text-xl text-gray-600 font-semibold w-full">
            Product Care
          </h4>
          <ul className="flex-[2_1_0%] list-disc font-semibold ml-5">
            <li>Hand wash using cold water.</li>
            <li>Do not using bleach.</li>
            <li>Hang it to dry.</li>
            <li>Iron on low temperature.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
