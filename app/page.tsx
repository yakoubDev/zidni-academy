'use client'
import Link from "next/link";
import React from "react";
import Classes from "./components/Classes";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const {user} = useAuth();
  return (
    <div className="mt-24">
      {/* Left */}
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[42px] max-sm:leading-10 md:text-6xl lg:text-7xl xl:text-8xl font-semibold text_gradient">
          Zidni <span className="text-white">Academy</span>
        </h1>
        <p className="text-center text-white/70">
          Learn the Quran with clarity and purpose. Zidni Academy offers live
          sessions, guided lessons, and resources to help you strengthen your
          faith and master Tajweed step by step.
        </p>

        <Link href={`${user ? "/apply" : "/login"}`}>
          <button className="btn">Start Learning</button>
        </Link>
      </div>

      {/* Our Classes Section */}
      <Classes />
    </div>
  );
};

export default Home;
