"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default async function DeleteComp({
  product_id,
}: {
  product_id: string;
}) {
  const hadleDelete = async () => {
    // try {
    //   const res = await fetch("http://localhost:3000/api/cart", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       product_id: product_id,
    //     }),
    //   });
    //   if (!res.ok) throw new Error("Deleteion Failed!");
    //   const result = await res.json();
    //   return result;
    // } catch (error) {
    //   console.log("error: ", error);
    // }
  };
  return (
    <Button onClick={hadleDelete} className="justify-self-end">
      <Trash2 />
    </Button>
  );
}
