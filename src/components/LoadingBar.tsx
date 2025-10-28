"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-pink-500 transition-all duration-300 z-[9999] ${
        loading ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    ></div>
  );
}
