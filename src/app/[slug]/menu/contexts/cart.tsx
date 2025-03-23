"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface IcartContext {
  isOpen: boolean;
  products: CartProduct[]
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}


export const CartContext = createContext<IcartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen(prev => !prev)
  };

  const addProduct = (product: CartProduct) => {


    const productIsAlreadyOnTheCart = products.some(
      (prevProducts) => prevProducts.id === product.id
    );

    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts(prevProducts => {
      return prevProducts.map(prevProducts => {
        if (prevProducts.id === product.id) {
          return {
            ...prevProducts,
            quantity: prevProducts.quantity + product.quantity,
          }
        }
        return prevProducts
      })
    })
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts(prevProducts => {
      return prevProducts.map(prevProducts => {
        if (prevProducts.id != productId) {
          return prevProducts;
        }
        if (prevProducts.quantity === 1) {
          return prevProducts;
        }
          return {...prevProducts, quantity: prevProducts.quantity - 1};
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts(prevProducts => {
      return prevProducts.map(prevProducts => {
        if (prevProducts.id != productId) {
          return prevProducts; 
        }
        return {...prevProducts, quantity: prevProducts.quantity + 1};
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != productId));
  };;

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}