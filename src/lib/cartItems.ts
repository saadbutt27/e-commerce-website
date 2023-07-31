"use"
import { cookies } from "next/headers";
import { v4 as randomIdGenerator } from "uuid";

export const handleAddToCart = (id: string) => {
  const uid = randomIdGenerator();
  const setCookies = cookies();

  const user_id = cookies().get("user_id");

  if (!user_id) {
    setCookies.set("user_id", uid);
  }
  setCookies.set("product_id", id);
};
