"use client";
import React, { useEffect, useState } from "react";
import { classes } from "../components/Classes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import { ClassType } from "@/types";

const Apply = () => {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filteredClasses, setFilteredClassses] = useState<ClassType[]>([]);
  const [formData, setFormData] = useState({
    selectedClass: "",
    experience: "",
    message: "",
  });

  useEffect(() => {
    if (!loadingUser && !user) {
      router.push("/login");
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (user) {
      const filtered = classes.filter(
        (cls) => !(user?.classes || []).includes(cls.title)
      );
      console.log("User classes", user?.classes);
      setFilteredClassses(filtered);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate before submitting
    if (!formData.selectedClass || !formData.experience) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setLoading(false);
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId: user?._id }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push("/");
        toast.success("Thanks for applying !");
      } else {
        toast.error(result.message || "Something went wrong...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
    } finally {
      setLoading(true);
    }
  };

  // ✅ Show loading while checking auth
  if (!user) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Start Learning{" "}
            <span className="bg-gradient-to-r from-[#00bc7d] via-[#79cfad] to-[#479c75] bg-clip-text text-transparent">
              Now!
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Fill out the form below to begin your Quran learning journey with
            Zidni Academy
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10">
          <div className="space-y-6">
            {/* Class Selection */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Select Your Class
              </h2>
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Choose a Class *
                </label>

                <select
                  name="selectedClass"
                  value={formData.selectedClass}
                  onChange={handleChange}
                  className="bg-white/5 text-white w-full h-12 rounded-lg indent-4 border border-white/30 focus:border-[#00bc7d] outline-none transition-colors"
                  required
                >
                  <option value="">Select a class</option>
                  {filteredClasses.map((cls, index) => (
                    <option key={index} value={cls.title}>
                      {cls.icon} {cls.title} - {cls.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Previous Quran Learning Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="bg-white/5 text-white w-full h-12 rounded-lg indent-4 border border-white/30 focus:border-[#00bc7d] outline-none transition-colors"
                required
              >
                <option value="">Select your experience level</option>
                <option value="No experience">No experience</option>
                <option value="Beginner">Beginner (Can read Arabic)</option>
                <option value="Intermediate">
                  Intermediate (Know basic Tajweed)
                </option>
                <option value="Advanced">
                  Advanced (Have memorized portions)
                </option>
              </select>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Additional Information (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us anything else you'd like us to know..."
                rows={4}
                className="bg-white/5 text-white placeholder:text-white/50 w-full rounded-lg p-4 border border-white/30 focus:border-[#00bc7d] outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit} className="btn w-full">
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <p className="text-center text-white/60 text-sm mt-4">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </form>
      </div>

      {/* Style tag for select options */}
      <style jsx>{`
        option {
          background-color: #042a2b;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Apply;
