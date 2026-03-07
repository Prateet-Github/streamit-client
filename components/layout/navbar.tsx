"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "@/hooks/useClickOutside";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

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
        <div className="relative" ref={profileRef}>
          <div
            className="cursor-pointer"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <Image
              src="/pfp.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-green-500 hover:scale-105 transition"
            />
          </div>

          {isProfileOpen && (
            <ProfileDropdown closeDropdown={() => setIsProfileOpen(false)} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
