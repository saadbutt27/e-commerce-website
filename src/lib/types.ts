import { Image as IImage } from "sanity";
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
  type: string;
  sizes: string[];
}

export type Product = {
  id: number;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
};
