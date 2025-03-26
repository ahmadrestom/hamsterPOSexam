"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [adminCode, setAdminCode] = useState("");
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
                body: JSON.stringify({ userName, email, password, adminCode}),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Registration failed.try again.");
            }
            alert("User registered successfully!");
            router.push("/login");
        } catch (err) {
            setError(err instanceof Error? err.message: "An error occured");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-blue-500">
          <div className="bg-black p-8 rounded-lg shadow-lg w-96 border border-gray-700">
            <h2 className="font-serif text-2xl font-bold mb-6 text-center text-white">Register</h2>
            <form className="space-y-4"  onSubmit={handleRegister}>
              <input
                autoComplete="off"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="font-mono text-blue-300 w-full p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                autoComplete="off"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono text-blue-300 w-full p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                autoComplete="off"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono text-blue-300 w-full p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                autoComplete="off"
                type="text"
                placeholder="Admin Code (optional)"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="font-mono text-blue-300 w-full p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="font-serif w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Sign Up
              </button>
            </form>
            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-400 hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      );     
}