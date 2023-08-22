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
      <div className="hover:scale-105 duration-300">
        <Image
          src={urlForImage(imgSrc).url()}
          alt="product1"
          width={400}
          height={400}
          className="object-cover h-[400px]"
        />
        <h3 className="text-xl font-semibold">{productName}</h3>
        <p className="text-xl font-semibold">${productPrice}</p>
      </div>
    </Link>
  );
}
