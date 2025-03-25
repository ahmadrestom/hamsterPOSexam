"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
            });

            if (!res.ok) {
                throw new Error("Registration failed. Try again.");
            }

            alert("User registered successfully!");
            router.push("/login");
        } catch (err) {
            setError(err instanceof Error? err.message: "An error occured");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-black p-8 rounded-lg shadow-md w-96">
            <h2 className="font-serif text-2xl font-bold mb-6 text-center">Register</h2>
            <form className="space-y-4">
              <input
              autoComplete="off"
                type="text"
                placeholder="Username"
                className="font-mono text-blue-300 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              autoComplete="off"
                type="email"
                placeholder="Email"
                className="font-mono text-blue-300 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              autoComplete="off"
                type="password"
                placeholder="Password"
                className="font-mono text-blue-300 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="font-serif w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
}