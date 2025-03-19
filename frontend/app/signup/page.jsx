// pages/signup.js
'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      if(formData.password != formData.password2){
        alert("Passwords don't match!",);
        return;
      }
      const res = await fetch('http://localhost:8000/auth/sign-up/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      if (res.ok) {
        alert("Verification email sent! Check your inbox.");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border-4 border-gray-300 rounded-lg shadow-xl p-10 w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">
          Sign-Up
        </h1>

        <input
          name="username"
          type="text"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <input
          name="password2"
          type="password"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-6 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 rounded-lg cursor-pointer text-white px-4 py-3 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 cursor-pointer">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
