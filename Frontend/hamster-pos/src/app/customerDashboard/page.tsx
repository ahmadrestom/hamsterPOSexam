"use client";

import { useEffect, useState } from "react";
import Navbar from "../../Componenets/NavBar";
import ProductCard from "../../Componenets/ProductCard";
import { useRouter } from "next/navigation";
import CategoryCard from "@/Componenets/CategoryCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
interface Category{
  category_id:number;
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
  const [role, setRole] = useState<string>(""); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token){
        router.push("/login");
        return;
    }
    const userrole = localStorage.getItem("role");
    setRole(userrole || "");
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

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    const items = Array.from(products);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setProducts(items);
  };

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
                key={category.category_id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.title ? null : category.title
                  )
                }
                className={`p-0 rounded-md cursor-pointer ${
                  selectedCategory === category.title
                    ? "bg-blue-100 text-black"
                    : "bg-black-100"
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="products">
                {(provided) => (
                  <div
                    className="grid grid-cols-3 gap-4 mt-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) =>
                        role === "admin" ? (
                          <Draggable
                            key={product.id}
                            draggableId={String(product.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ProductCard product={product} />
                              </div>
                            )}
                          </Draggable>
                        ) : (
                          <ProductCard key={product.id} product={product} />
                        )
                      )
                    ) : (
                      <p>No products found</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerDashboard;