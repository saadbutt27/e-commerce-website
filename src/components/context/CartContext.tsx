"use client";
import { createContext, useState, ReactNode } from "react";
import * as React from "react";

// Create the cart context
const CartContext = createContext<any>(null);

// Create a provider for the cart context
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
