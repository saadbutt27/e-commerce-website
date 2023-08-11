"use client";
import { createContext, useState, ReactNode } from "react";
import * as React from "react";

// Create the cart context
const PriceContext = createContext<any>(null);

// Create a provider for the cart context
const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [subTotal, setSubTotal] = useState(0);
  // console.log(cartCount)
  return (
    <PriceContext.Provider value={{ subTotal, setSubTotal }}>
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceProvider };
