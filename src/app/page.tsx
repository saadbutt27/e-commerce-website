import Hero from "@/views/Hero";
import Promotions from "@/views/Promotions";
import ProductsList from "@/views/ProductsList";
import Newsletter from "@/views/Newsletter";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    success?: boolean;
    success_id: string | undefined;
  };
}) {
  return (
    <>
      <Hero />
      <Promotions />
      <ProductsList />
      <Newsletter id={searchParams.success_id} />
    </>
  );
}
