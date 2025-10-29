'use client'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Login Component
const Login = () => {
  const router = useRouter();
  const {setUser} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);

    try {
       const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if(!res.ok){
        return toast.error(result.message);
      }

      setUser(result.user);
      toast.success("Welcome back !");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-xl">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="h2 mb-2">Welcome <span className="text_gradient">Back</span></h1>
            <p className="text-white/70 max-w-none">Sign in to continue your Quran learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-white/5 text-white placeholder:text-white/50"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-white/5 text-white placeholder:text-white/50"
                required
              />
            </div>

            <button type="submit" className="btn w-full py-3">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link href={"/signup"} className="text-accent hover:text-accent/80 transition-colors font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;