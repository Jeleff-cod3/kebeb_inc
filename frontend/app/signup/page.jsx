// pages/signup.js
'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', username: '', password: '', password2: '' });
  const [error, setError] = useState(null); // To handle errors
  const [isSuccess, setIsSuccess] = useState(false); // To show success message after sign-up
  const [isEmailVerified, setIsEmailVerified] = useState(false); // To track email verification status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.password2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/auth/sign-up', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.username, // Assuming username is the email
          password: formData.password,
        }),
      });

      if (res.ok) {
        // Set success message if the sign-up is successful
        setIsSuccess(true);
        setError(null); // Clear previous errors
        // Check if email is verified after 2 seconds
        setTimeout(() => {
          checkEmailVerification();
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.detail || 'Error during sign-up.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An unexpected error occurred.');
      setIsSuccess(false);
    }
  };

  const checkEmailVerification = async () => {
    // Check the backend to verify if the user has confirmed their email
    try {
      const res = await fetch('http://localhost:8000/auth/check-email-verification', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.is_verified) {
          setIsEmailVerified(true);
          // Redirect to login after email is verified
          router.push('/login');
        } else {
          alert("Your email is still not verified. Please check your email for the verification link.");
        }
      } else {
        setError("Unable to check email verification status.");
      }
    } catch (error) {
      console.error('Error checking email verification:', error);
      setError('An unexpected error occurred while checking email verification.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border-4 border-gray-300 rounded-lg shadow-xl p-10 w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">Sign-Up</h1>

        {isSuccess && (
          <div className="mb-4 text-green-500 text-center">
            <p>Registration successful! Please check your email to verify your account.</p>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />

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