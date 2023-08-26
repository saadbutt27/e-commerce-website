"use client";
import Hero from "@/views/Hero";
import Promotions from "@/views/Promotions";
import ProductsList from "@/views/ProductsList";
import Newsletter from "@/views/Newsletter";
import { useCart } from "@/components/context/CartContext";
import { useEffect } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams:
    | undefined
    | {
        success?: boolean;
        success_id: string;
      };
}) {
  const { setCartCount } = useCart();
  useEffect(() => {
    if (searchParams?.success) {
      fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/clear-cookies?user_id=${searchParams.success_id}`,
        {
          cache: "no-store",
        }
      ).then((data) => {
        setCartCount(0);
      });
    }
  }, []);
  return (
    <>
      <Hero />
      <Promotions />
      <ProductsList />
      <Newsletter />
    </>
  );
}
