import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function product({
  imgSrc,
  productName,
  productPrice,
  productId,
}: {
  imgSrc: any;
  productName: string;
  productPrice: number;
  productId: string;
}) {
  return (
    <Link href={`/ProductDetails/${productId}`}>
      <div className="hover:scale-105 duration-300">
        <Image
          src={imgSrc}
          alt="product1"
          width={400}
          height={400}
          className="object-cover object-center w-full h-[300] md:w-[380px] md:h-[400px] "
        />
        <h3 className="text-xl font-semibold">{productName}</h3>
        <p className="text-xl font-semibold">${productPrice}</p>
      </div>
    </Link>
  );
}
