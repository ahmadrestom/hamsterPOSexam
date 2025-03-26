"use client";

import React from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
};

const addToCart = (product: Product) => {
  const storedCart = localStorage.getItem("cart");
  const cart: Product[] = storedCart ? JSON.parse(storedCart) : [];
  const exists = cart.some((item) => item.id === product.id);
  if (!exists) {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
};




const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <h3 className="font-semibold">{product.title}</h3>
      <p>{product.description}</p>
      <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
