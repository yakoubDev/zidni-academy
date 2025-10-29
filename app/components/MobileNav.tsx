"use client";
import React, { useRef, useState, useEffect } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LinkType } from "@/types";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "@/utils/AuthContext";

interface MobileNavProps {
  links: LinkType[];
}

const MobileNav: React.FC<MobileNavProps> = ({ links }) => {
  const { user, logout } = useAuth();

  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
    };

    if (toggleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

  return (
    <div className="flex gap-4 items-center lg:hidden z-50">
      <Link href={`${user ? "/apply" : "/login"}`}>
        <button className="btn">Apply Now</button>
      </Link>
      <RiMenu4Line
        size={32}
        onClick={() => setToggleMenu(true)}
        className="cursor-pointer hover:text-accent transition-colors"
      />

      {toggleMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98]"
            onClick={() => setToggleMenu(false)}
          />

          {/* Menu */}
          <div
            ref={menuRef}
            className="fixed top-0 right-0 flex flex-col gap-6 h-screen bg-background border-l border-white/10 p-6 w-72 slide-left z-[99]"
          >
            {/* Close button */}
            <div className="flex justify-between items-center">
              <Link href="/" onClick={() => setToggleMenu(false)}>
                <h1 className="text-2xl font-bold text_gradient">Zidni</h1>
              </Link>
              <IoClose
                size={32}
                onClick={() => setToggleMenu(false)}
                className="cursor-pointer hover:text-accent transition-colors"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 flex-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  className={`${
                    pathname === link.path
                      ? "text-white bg-accent/20 border-l-2 border-accent pl-4"
                      : "hover:text-accent hover:pl-2"
                  } capitalize transition-all text-lg py-2`}
                  href={link.path}
                  onClick={() => setToggleMenu(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3 mt-auto">
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-red-500/90 hover:bg-red-500 cursor-pointer transition-all"
                >
                  <MdLogout className="text-xl" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link href="/login" onClick={() => setToggleMenu(false)}>
                  <button className="flex items-center justify-center gap-2 w-full border border-white/30 px-4 py-2.5 rounded-xl font-medium hover:border-emerald-500 hover:text-emerald-500 cursor-pointer transition-all">
                    <MdLogin className="text-xl" />
                    <span>Login</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
