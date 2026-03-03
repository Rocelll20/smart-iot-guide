"use client";

import Link from "next/link";
import React, { useState } from "react";
import { User, Lock, EyeOff, Eye, ArrowRight, Diamond, Mail, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    // simulate signup
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div
      className={`${montserrat.className} min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient glow only in dark mode */}
      {darkMode && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-700 rounded-full filter blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900 rounded-full filter blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
        </>
      )}

      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
          className="p-2 rounded-full border transition-colors duration-300 hover:bg-red-500 hover:text-white border-red-500 text-red-500"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`relative flex flex-col md:flex-row w-full max-w-[800px] min-h-[520px] mx-4 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-red-900/30 transition-colors duration-500 ${
          darkMode ? "bg-[#1a1a1a]/80" : "bg-gray-50"
        }`}
      >
        {/* Left Side */}
        <div
          className={`w-full md:w-5/12 p-10 flex flex-col justify-between relative border-r border-red-900/30 ${
            darkMode ? "bg-gradient-to-br from-red-600/20 to-black/40 text-red-100" : "bg-gradient-to-br from-red-50 to-white text-red-700"
          }`}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <p className={`text-sm mb-1 ${darkMode ? "text-red-300" : "text-red-500"}`}>Welcome to</p>
              <h1 className={`text-2xl font-bold mb-8 tracking-wide ${darkMode ? "text-red-500" : "text-red-600"}`}>
                SmartGuide IoT
              </h1>
              <p className={`text-sm leading-relaxed max-w-[220px] ${darkMode ? "text-red-200" : "text-red-600"}`}>
                 "Turning care into independence. Technology that sees, Guiding every step with trust."
              </p>
            </div>
            <div className="mt-16">
              <Diamond className={`w-8 h-8 ${darkMode ? "text-red-500" : "text-red-600"}`} />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-7/12 p-10 z-10 flex flex-col justify-center">
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-red-500" : "text-red-600"}`}>Create an account</h2>

          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white placeholder:text-red-300/50"
                    : "bg-white border border-red-200 text-[#7a1f1f] placeholder:text-red-300"
                }`}
                placeholder="Full name"
                aria-label="Full name"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white placeholder:text-red-300/50"
                    : "bg-white border border-red-200 text-[#7a1f1f] placeholder:text-red-300"
                }`}
                placeholder="Email address"
                aria-label="Email address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white placeholder:text-red-300/50"
                    : "bg-white border border-red-200 text-[#7a1f1f] placeholder:text-red-300"
                }`}
                placeholder="Password"
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye className={`h-4 w-4 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-400"} transition-colors`} />
                ) : (
                  <EyeOff className={`h-4 w-4 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-400"} transition-colors`} />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex justify-between items-center px-5 shadow-lg shadow-red-800/30 mt-2"
            >
              <span>{loading ? "Creating account..." : "Sign Up"}</span>
              <ArrowRight className="w-5 h-5 text-white/90" />
            </button>

            {/* Sign in link */}
            <div className="text-center mt-2">
              <p className={`text-xs ${darkMode ? "text-red-300" : "text-red-600"}`}>
                Already have an account?{" "}
                <Link href="/auth/sign-in" className={`${darkMode ? "text-red-500" : "text-red-600"} hover:underline ml-1`}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-xs text-red-400 text-center w-full">
        © SmartGuide IoT 2026
      </div>
    </div>
  );
}
