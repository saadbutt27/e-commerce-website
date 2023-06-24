import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCard from "@/components/ProductCard";

export const getProductData = async () => {
  const res =
    await client.fetch(`*[_type=="product" && category->name=='Female'] {
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
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-10">
      {data.map((product, index) => (
        <div>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
