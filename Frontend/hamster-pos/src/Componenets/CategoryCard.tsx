"use client";

import React from "react";

interface Category{
  category: {
    title: string;
    description: string;
  };
}

const CategoryCard: React.FC<Category> = ({ category }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <h3 className="text-blue-600 font-semibold">{category.title}</h3>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryCard;
