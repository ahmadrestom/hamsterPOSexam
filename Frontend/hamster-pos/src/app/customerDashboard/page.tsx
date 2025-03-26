"use client";

import { useEffect, useState } from "react";
import Navbar from "../../Componenets/NavBar";
import ProductCard from "../../Componenets/ProductCard";
import { useRouter } from "next/navigation";
import CategoryCard from "@/Componenets/CategoryCard";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
interface Category{
  id:number;
  title:string;
  description:string
}



const CustomerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token){
        router.push("/login");
        return;
    }
    fetch("http://localhost:8080/api/v2/products/getAllProducts", {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token){
        router.push("/login");
        return;
    }
    fetch("http://localhost:8080/api/v2/categories/getAllCategories", {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || product.category === selectedCategory)
    );
  });

  return (   
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>




      <div className="mb-6">
      <h2 className="text-xl font-semibold">Categories</h2>
      <div className="grid grid-cols-3 gap-7 mt-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
            className={`p-0 rounded-md cursor-pointer ${
              selectedCategory === category.title ? "bg-blue-100 text-black" : "bg-black-100"
            }`}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerDashboard;