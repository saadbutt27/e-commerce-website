"use client"
import Hero from "@/views/Hero";
import Promotions from "@/views/Promotions";
import ProductsList from "@/views/ProductsList";
import Newsletter from "@/views/Newsletter";
import toast, { Toaster } from "react-hot-toast";

export default async function Home() {
  const notify = () => toast("Here is your toast.");
  return (
    <>
      <div>
        <button onClick={notify}>Make me a toast</button>
        {/* <Toaster /> */}
      </div>
      <Hero />
      <Promotions />
      <ProductsList />
      <Newsletter />
    </>
  );
}
