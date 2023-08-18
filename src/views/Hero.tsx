import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "/public/images/hero-image.webp";
import Bazaar from "/public/images/bazaar.webp";
import Bustle from "/public/images/bustle.webp";
import Versace from "/public/images/versace.webp";
import Instyle from "/public/images/instyle.webp";

export default function Hero() {
  return (
    <section className="lg:flex items-center lg:justify-end flex-col lg:flex-row gap-y-10 xl:gap-x-20 py-6 mb-20">
      <div className="flex-1 space-y-10">
        <Badge className="py-2 px-6 bg-blue-200 text-base text-blue-700 font-bold rounded-[2px]">
          Sale 70%
        </Badge>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-6">
          An Industrial Take on Streetwear
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        <Link href={"#products"}>
          <Button className="bg-black text-white h-12 px-8 mt-4 gap-x-2">
            <ShoppingCart />
            Start Shopping
          </Button>
        </Link>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4">
          <Image src={Bazaar} alt="bazaar-logo" />
          <Image src={Bustle} alt="bustle-logo" />
          <Image src={Versace} alt="versace-logo" />
          <Image src={Instyle} alt="instyle-logo" />
        </div>
      </div>
      <div className="lg:block hidden flex-1">
        <div className="h-[36rem] w-[36rem] bg-[#ffece3] rounded-full -z-50 relative">
          <Image
            src={HeroImage}
            alt={"Hero"}
            className="absolute h-full bottom-10 left-10"
          />
        </div>
      </div>
    </section>
  );
}
