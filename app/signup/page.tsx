"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// SignUp Component
const SignUp = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("passwords doesn't match");
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Something went wrong ...");
        return;
      }

      toast.success(`Account Created !`);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ...");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-0 md:p-4 mt-20">
      <div className="w-full max-w-xl">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="h2 mb-2 text-2xl md:text-4xl lg:text-5xl">
              Join <span className="text_gradient">Zidni Academy</span>
            </h1>
            <p className="text-white/70 max-w-none">
              Start your Quran learning journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="bg-white/5 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="bg-white/5 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Phone</label>
              <input
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-white/5 text-white"
              >
                <option value="">Select your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <button onClick={handleSubmit} className="btn w-full py-3 mt-6">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
