// pages/login.js
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border-4 border-gray-300 rounded-lg shadow-xl p-10 w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">
          Log In
        </h1>

        <input
          type="text"
          placeholder="Username or Email"
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-6 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <button className="w-full bg-blue-500 rounded-lg cursor-pointer text-white px-4 py-3 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don`t have an account?{" "}
          <Link href="/signup" className="text-blue-500 cursor-pointer">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
