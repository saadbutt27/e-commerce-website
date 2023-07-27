import React from "react";
import Image from "next/image";
import P1 from "public/product1.jpg";

export default function ProductsList() {
  return (
    <div>
      <Image src={P1} alt="product1" />
      <h3>Flex Sweatshirt</h3>
      <p>$104</p>
    </div>
  );
}