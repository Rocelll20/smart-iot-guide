"use client";

import Link from 'next/link';
import React, { useState } from "react";
import { User, Lock, EyeOff, Eye, ArrowRight, Diamond, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState<SignUpForm>({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-[#171f2c] relative overflow-hidden font-sans">
      {/* Background gradients for the ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#0B4A5C] rounded-full filter blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#3D1E6D] rounded-full filter blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>

      <div className="relative flex flex-col md:flex-row w-full max-w-[800px] min-h-[460px] mx-4 rounded-2xl shadow-2xl overflow-hidden bg-[#242b3b]/60 backdrop-blur-xl border border-white/5">

        {/* Left Side */}
        <div className="w-full md:w-5/12 p-10 flex flex-col justify-between bg-gradient-to-br from-teal-500/10 to-indigo-500/10 relative border-r border-white/5">
          <div className="absolute inset-0 bg-transparent z-0"></div>
          <div className="relative z-10 flex flex-col h-full text-white/90">
            <div>
              <p className="text-sm text-white/60 mb-1">Welcome to</p>
              <h1 className="text-2xl font-bold text-white mb-8 tracking-wide">SmartGuide</h1>
              <p className="text-sm text-white/70 leading-relaxed max-w-[200px]">
                SmartGuide is a platform that helps you to find the best places to visit in your area.
              </p>
            </div>
            <div className="mt-16">
              <Diamond className="w-8 h-8 text-[#4aded8]" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-7/12 p-10 bg-[#1e2532]/80 z-10 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-white mb-6">Registration</h2>

          {error && (
            <div className="mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#131924]/80 border border-transparent rounded-lg focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-white/10 text-sm text-white placeholder:text-white/40 transition-all font-sans"
                placeholder="Full Name"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#131924]/80 border border-transparent rounded-lg focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-white/10 text-sm text-white placeholder:text-white/40 transition-all font-sans"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 bg-[#131924]/80 border border-transparent rounded-lg focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-white/10 text-sm text-white placeholder:text-white/40 transition-all font-sans"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4 text-white/40 hover:text-white transition-colors" />
                ) : (
                  <EyeOff className="h-4 w-4 text-white/40 hover:text-white transition-colors" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4f8bea] to-[#42d1f5] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex justify-between items-center px-5 shadow-lg shadow-[#42d1f5]/20 mt-2"
            >
              <span>{loading ? "Signing Up..." : "Sign Up"}</span>
              <ArrowRight className="w-5 h-5 text-white/90" />
            </button>

            <div className="text-center mt-2">
              <p className="text-xs text-white/40">
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="text-[#42d1f5] hover:underline ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-xs text-white/30 text-center w-full">
        © smart-guide 2026
      </div>
    </div>
  );
}
