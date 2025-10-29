import Link from "next/link";
import React from "react";

export const classes = [
  {
    title: "Tajweed Class",
    description:
      "Master the art of proper Quran recitation with correct pronunciation and rules of Tajweed",
    price: "8.99$/month",
    level: "All Levels",
    icon: "📖",
  },
  {
    title: "Memorization Class",
    description:
      "Structured Hifz program to help you memorize the Holy Quran with proper guidance",
    price: "8.99$/month",
    level: "Beginner to Advanced",
    icon: "🧠",
  },
  {
    title: "Kids Class",
    description:
      "Fun and interactive Quran learning designed specifically for children aged 5-12",
    price: "8.99$/month",
    level: "Kids",
    icon: "👶",
  },
  {
    title: "Arabic Class",
    description:
      "Learn Arabic language fundamentals to better understand the Quran",
    price: "8.99$/month",
    level: "Beginner",
    icon: "🔤",
  },
  {
    title: "Advanced Class",
    description:
      "Deep dive into Quranic studies, Tafseer, and advanced recitation techniques",
    price: "8.99$/month",
    level: "Advanced",
    icon: "🎓",
  },
  {
    title: "Senior Class",
    description:
      "Specially designed program for older students with flexible pacing and timing",
    price: "8.99$/month",
    level: "All Levels",
    icon: "👴",
  },
];
const Classes = () => {

  return (
    <div className="flex flex-col gap-8 items-center mt-24 mb-16">
      <h1 className="h2 text-center">
        Our <span className="text_gradient">Classes</span>
      </h1>

      <div id="classes" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 ">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{classItem.icon}</span>
              <h3 className="h3 text-white">{classItem.title}</h3>
            </div>

            <p className="text-white/80 text-sm mb-4 leading-relaxed max-w-none">
              {classItem.description}
            </p>

            <div className="flex justify-between items-center mb-4 text-xs">
              <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                {classItem.level}
              </span>
              <span className="px-2 py-1 bg-accent/10 text-emerald-400 rounded-full">
                {classItem.price}
              </span>
            </div>
            <Link href={"/apply"}>
              <button className="btn w-full text-sm">Apply Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
