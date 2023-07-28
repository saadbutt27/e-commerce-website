import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="flex justify-center text-center mt-48">
      <div className="space-y-6 relative">
        {/* <div className="text-5xl md:text-7xl lg:text-9xl text-gray-800 font-bold opacity-10 absolute top-10 -left-20 -z-50">
        Newsletter
        </div> */}
        <h2 className="text-4xl font-bold">Subscribe Our Newsletter</h2>
        <p className="text-xl">
          Get the latest information and promo offers directly
        </p>
        <form className="flex justify-center flex-wrap gap-x-2 gap-y-4 sm:gap-y-0">
          <Input placeholder="Email" type="email" className="w-full sm:w-3/4"/>
          <Button className="bg-black text-white">Get Started</Button>
        </form>
      </div>
    </section>
  );
}
