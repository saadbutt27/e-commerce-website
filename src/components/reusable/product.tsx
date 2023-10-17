import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";

export default function Product({
  imgSrc,
  productName,
  productPrice,
  productId,
  slug,
}: {
  imgSrc: any;
  productName: string;
  productPrice: number;
  productId: string;
  slug: string;
}) {
  return (
    <Link href={`/ProductDetails/${slug}`}>
      <div className="">
        <Image
          src={urlForImage(imgSrc).url()}
          alt="product1"
          width={300}
          height={400}
          className="object-cover object-top h-[400px] w-full sm:w-[300px] mb-2"
        />
        <h3 className="text-xl font-semibold">{productName}</h3>
        <p className="text-xl font-semibold">${productPrice}</p>
      </div>
    </Link>
  );
}
