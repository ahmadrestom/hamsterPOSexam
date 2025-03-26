"use client";

import { useEffect, useState } from "react";
import Navbar from "../../Componenets/NavBar";
import ProductCard from "../../Componenets/ProductCard";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

const CustomerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="border border-gray-300 p-4 rounded-md">
              Category 1
            </div>
            <div className="border border-gray-300 p-4 rounded-md">
              Category 2
            </div>
            <div className="border border-gray-300 p-4 rounded-md">
              Category 3
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
