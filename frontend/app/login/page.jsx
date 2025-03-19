'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8000/auth/log-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        router.push('/');
      } else {
        const data = await res.json();
        alert(`Login Failed: ${data.detail}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // ✅ Google Login Flow (Now Uses Google's API)
  const handleGoogleLogin = () => {
    const clientId = "YOUR_GOOGLE_CLIENT_ID"; // REPLACE THIS
    const redirectUri = "http://localhost:3000/google-callback"; // REPLACE IF DIFFERENT
    const scope = "openid email profile";
    const responseType = "token id_token";

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=select_account`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border-4 border-gray-300 rounded-lg shadow-xl p-10 w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">
          Log In
        </h1>

        <input
          name="username"
          type="text"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-6 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 rounded-lg cursor-pointer text-white px-4 py-3 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 cursor-pointer">
            Sign up
          </Link>
        </p>

        {/* ✅ Google Login Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          >
            Log in with Google
          </button>
        </div>

      </div>
    </div>
  );
}
