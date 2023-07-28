import React from "react";
import Image from "next/image";
import P1 from "public/images/product1.png";
import P2 from "public/images/product2.png";
import P3 from "public/images/product3.png";
import P4 from "public/images/product4.png";

export default function ProductsList() {
  return (
    <section className="mb-20">
      <h3 className="uppercase text-base text-center mb-2 text-blue-700 font-semibold">
        Products
      </h3>
      <h1 className="capitalize text-4xl text-center font-semibold mb-10">
        check what we have
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-y-0 gap-x-10">
        <div className="hover:scale-110 duration-300">
          <Image src={P1} alt="product1" className="w-full h-full" />
          <h3 className="text-xl font-semibold">Brushed Raglan Sweatshirt</h3>
          <p className="text-xl font-semibold">$195</p>
        </div>
        <div className="hover:scale-110 duration-300">
          <Image src={P2} alt="product2" className="w-full h-full" />
          <h3 className="text-xl font-semibold">Cameryn Sash Tie Shirt</h3>
          <p className="text-xl font-semibold">$545</p>
        </div>
        <div className="hover:scale-110 duration-300">
          <Image src={P3} alt="product3" className="w-full h-full" />
          <h3 className="text-xl font-semibold">Brushed Raglan Sweatshirt</h3>
          <p className="text-xl font-semibold">$195</p>
        </div>
        {/* <div className="hover:scale-110 duration-300">
          <Image src={P4} alt="product4" className="w-full h-full" />
          <h3 className="text-xl font-semibold">Imperial Alpaca Hoodie</h3>
          <p className="text-xl font-semibold">$195</p>
        </div> */}
      </div>
    </section>
  );
}
