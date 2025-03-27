"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categories, setCategories] = useState<Array<{
        category_id: number; 
        title: string;
        description: string;
    }>>([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v2/categories/getAllCategories", {
                    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [token]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!productCategory) {
            alert("Please select a category");
            return;
        }
    
        const categoryId = Number(productCategory);
        if (typeof categoryId !== 'number' || isNaN(categoryId)) {
            alert("Invalid category selected");
            return;
        }

        const productData = {
            title: productTitle,
            description: productDescription,
            price: Number(productPrice),
            category: {
                category_id: categoryId,
                title: null, 
                description: null,
                products: null
            }
        };
    
        console.log("Final payload:", JSON.stringify(productData));
    
        try {
            const response = await fetch("http://localhost:8080/api/v2/products/createProduct", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add product");
            }
    
            alert("Product added successfully!");
            setProductTitle("");
            setProductDescription("");
            setProductPrice("");
            setProductCategory("");
            
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        const categoryData = {
            title: categoryTitle,
            description: categoryDescription,
        };
        try {
            const response = await fetch("http://localhost:8080/api/v2/categories/addCategory", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(categoryData),
            });
            if (response.ok) {
                alert("Category added successfully!");
                setCategoryTitle("");
                setCategoryDescription("");
            } else {
                alert("Error adding category.");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
                    <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Title" required />
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Description" required />
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Price" required />
                    <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="border p-2 rounded-md w-full"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.title}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400">Add Product</button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Add New Category</h2>
                <form onSubmit={handleAddCategory} className="space-y-4 mt-4">
                    <input type="text" value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Title" required />
                    <textarea value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} className="border p-2 rounded-md w-full" placeholder="Description" required />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">Add Category</button>
                </form>
            </div>
        </div>
        
    );
};

export default AdminPanel;