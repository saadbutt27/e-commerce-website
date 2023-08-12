"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import * as React from "react";

// Create the cart context
const CartContext = createContext<any>(null);

function useCart() {
  return useContext(CartContext);
}

// Create a provider for the cart context
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  // console.log(cartCount)
  const contextValue = {
    cartCount,
    setCartCount,
    subTotal,
    setSubTotal,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export { useCart, CartContext, CartProvider };
