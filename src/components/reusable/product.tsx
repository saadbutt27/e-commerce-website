import React from "react";
import Image from "next/image";

export default function product({
  imgSrc,
  productName,
  productPrice,
}: {
  imgSrc: any;
  productName: string;
  productPrice: number;
}) {
  return (
    <div className="hover:scale-105 duration-300">
      <Image
        src={imgSrc}
        alt="product1"
        width={300}
        height={300}
        className="max-h-[300px] object-cover object-top"
      />
      <h3 className="text-xl font-semibold">{productName}</h3>
      <p className="text-xl font-semibold">${productPrice}</p>
    </div>
  );
}
