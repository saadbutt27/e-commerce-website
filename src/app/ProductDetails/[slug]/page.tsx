import React from "react";
import { client } from "@/lib/sanityClient";
import { IProduct } from "@/lib/types";
import ProductDetailsComp from "@/components/reusable/ProductDetailsComp";

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
      <ProductDetailsComp product={product[0]}/>
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
