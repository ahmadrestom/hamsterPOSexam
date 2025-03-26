"use client";

import React from "react";

interface ProductProps {
  product: {
    title: string;
    description: string;
    price: number;
    category: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <h3 className="font-semibold">{product.title}</h3>
      <p>{product.description}</p>
      <p className="font-bold text-blue-600">${product.price}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <button className="bg-blue-500 text-white p-2 rounded mt-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
