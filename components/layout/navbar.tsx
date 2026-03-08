"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "@/hooks/useClickOutside";
import { Search, Menu, X } from "lucide-react";
import { useCurrentUser } from "@/queries/auth";

type NavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export default function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
}: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isLoading } = useCurrentUser();

  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <header className="sticky top-0 z-50  text-black dark:text-white bg-white dark:bg-black border border-green-500">
      <nav className="flex items-center justify-between px-4 py-3 ">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded hover:bg-white/10"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="font-extrabold text-4xl text-green-500">
            StreamIt
          </Link>
        </div>

        {/* SEARCH */}
        <div className="relative w-40 md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search"
            aria-label="Search videos"
            className="border  border-green-500 px-4 py-2 pl-10 rounded-full w-full bg-transparent outline-none"
          />
        </div>

        {/* RIGHT */}
        {isLoading ? (
          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
        ) : currentUser ? (
          <div className="relative" ref={profileRef}>
            <Image
              src="/pfp.jpg"
              alt="profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-green-500 cursor-pointer"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />

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
}
