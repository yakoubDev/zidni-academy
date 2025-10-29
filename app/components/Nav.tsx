"use client";
import { LinkType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNav from "./MobileNav";
import { useAuth } from "@/context/AuthContext";
import { MdLogin, MdLogout } from "react-icons/md";

export const links: LinkType[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Classes",
    path: "/#classes",
  },
  {
    name: "About us",
    path: "/#about",
  },
  // {
  //   name: "Plans",
  //   path: "/#plans",
  // },
];

const Nav = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <nav className="fixed w-full top-0 right-0 backdrop-blur-md flex flex-row justify-between items-center px-2 lg:px-6 xl:px-8 py-2 z-[100] ">
      {/* Logo */}
      <Link href={"/"}>
        <h1 className="text-3xl lg:text-5xl font-bold text_gradient">Zidni</h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-8">
        {links.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`${
              pathname === link.path
                ? "text-white bg-accent border-accent px-1 rounded"
                : "hover:border-b-2 border-accent"
            } font-semibold capitalize  transition-all`}
          >
            <span>{link.name}</span>
          </Link>
        ))}

        <div className="ml-6 flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 lg:px-4 py-1 lg:py-2 rounded-xl font-medium text-white bg-red-500/70 hover:bg-red-500 cursor-pointer transition-all"
            >
              <MdLogout className="text-xl" />
              <span>Logout</span>
            </button>
          ) : (
            <Link href={"/login"}>
              <button className="flex items-center gap-2 border border-white/30 px-3 lg:px-4 py-1 lg:py-2 rounded-xl font-medium hover:border-emerald-500 hover:text-emerald-500 cursor-pointer transition-all">
                <MdLogin className="text-xl" />
                <span>Login</span>
              </button>
            </Link>
          )}

          <Link href={`${user ? "/apply" : "/login"}`}>
            <button className="btn">Apply Now</button>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav links={links} />
    </nav>
  );
};

export default Nav;
