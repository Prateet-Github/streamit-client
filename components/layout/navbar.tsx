"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "@/hooks/useClickOutside";
import { Search } from "lucide-react";
import { useCurrentUser } from "@/queries/auth";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isLoading } = useCurrentUser();

  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <header className="sticky top-0 z-50 bg-black border border-green-500 rounded-lg">
      <nav className="mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-2xl text-green-500">
          StreamIt
        </Link>

        {/* Search */}
        <div className="relative w-40 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search"
            aria-label="Search videos"
            className="border-2 border-green-500 px-4 py-2 pl-10 rounded-full w-full outline-none bg-transparent text-white focus:border-green-400 focus:ring-1 focus:ring-green-400"
          />
        </div>

        {/* Profile */}
        {isLoading ? (
          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
        ) : currentUser ? (
          <div className="relative" ref={profileRef}>
            <div
              className="cursor-pointer"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <Image
                src="/pfp.jpg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-green-500"
              />
            </div>

            {isProfileOpen && (
              <ProfileDropdown closeDropdown={() => setIsProfileOpen(false)} />
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="border border-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-400 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
