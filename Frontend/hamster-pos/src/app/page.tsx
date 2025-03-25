"use client"; // Required for client-side hooks like useRouter

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register"); // Redirect to the register page
  }, []);

  return null; // No content because user is redirected
}