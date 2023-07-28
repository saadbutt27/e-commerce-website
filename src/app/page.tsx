import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCard from "@/components/ProductCard";
import Hero from "@/views/Hero";
import ProductsList from "@/views/ProductsList";
import Promotions from "@/views/Promotions";
import Newsletter from "@/views/Newsletter";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
    price, 
    _id,
    title,
    image,
    alt,
    category -> {
      name
    }
  }`);
  return res;
};

interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
}

export default async function Home() {
  const data: IProduct[] = await getProductData();
  return (
    <>
      <Hero />
      <Promotions />
      <ProductsList />
      <Newsletter />
    </>
  );
}
