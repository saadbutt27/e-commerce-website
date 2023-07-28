import Hero from "@/views/Hero";
import ProductsList from "@/views/ProductsList";
import Promotions from "@/views/Promotions";
import Newsletter from "@/views/Newsletter";

export default async function Home() {
  return (
    <>
      <Hero />
      <Promotions />
      <ProductsList />
      <Newsletter />
    </>
  );
}
