"use client"

import Navbar from "../../Componenets/NavBar";

const CustomerDashboard = () => {
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

                        <div className="border border-gray-300 p-4 rounded-md">Category 1</div>
                        <div className="border border-gray-300 p-4 rounded-md">Category 2</div>
                        <div className="border border-gray-300 p-4 rounded-md">Category 3</div>

                    </div>
                </div>


                
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Products</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">

                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="font-semibold">Product 1</h3>
                            <p>Description of Product 1</p>
                            <p>$10.00</p>
                            <button className="bg-blue-500 text-white p-2 rounded mt-2">Add to Cart</button>
                        </div>
                        
                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="font-semibold">Product 2</h3>
                            <p>Description of Product 2</p>
                            <p>$20.00</p>
                            <button className="bg-blue-500 text-white p-2 rounded mt-2">Add to Cart</button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboard;
