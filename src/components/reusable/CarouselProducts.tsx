import React from "react";
import { GridTileImage } from "@/components/reusable/GridTileImage";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";

export default function CarouselProducts({
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
    <li
      key={`${productId}`}
      className="relative aspect-square w-2/5 max-w-[475px] flex-none md:w-1/3"
    >
      <Link href={`/ProductDetails/${slug}`} className="relative h-full w-full">
        <GridTileImage
          alt={"Image"}
          label={{
            title: productName,
            amount: productPrice.toString(),
            currencyCode: "$",
          }}
          src={urlForImage(imgSrc).url()}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
      </Link>
    </li>
  );
}
