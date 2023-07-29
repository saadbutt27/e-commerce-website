import Hero from "@/views/Hero";
import Promotions from "@/views/Promotions";
import ProductsList from "@/views/ProductsList";
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
