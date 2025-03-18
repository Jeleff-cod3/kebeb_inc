"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-xl font-extrabold text-2xl mb-8">
        WELCOME TO OUR KEBAB STORE!
      </p>
      <Link href="/order">
        <button className="flex items-center justify-center cursor-pointer bg-blue-500 text-white border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
          Order now
        </button>
      </Link>
    </div>
  );
}
