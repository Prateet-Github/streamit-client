"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "@/hooks/useClickOutside";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);



  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <header className="sticky bg-black top-0 z-50 border border-green-500 rounded-lg">
      <nav className="mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/">
          <span className="font-extrabold text-2xl text-green-500">
            StreamIt
          </span>
        </a>

        {/* Input  */}

        <input
          type="text"
          placeholder="Search"
          className="border-2 border-green-500 px-4 py-2 rounded-full outline-0 md:w-2xl bg-transparent text-white"
        />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            className="cursor-pointer"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <Image
              src="/pfp.jpg"
              alt="pfp"
              width={40}
              height={40}
              className="rounded-full border-2 border-green-500"
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
