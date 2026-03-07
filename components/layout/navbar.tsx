"use client";

// import { Menu, X } from "lucide-react";
import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";

// const navItems = [
//   { href: "#about", label: "About" },
//   { href: "#skills", label: "Skills" },
//   { href: "#projects", label: "Projects" },
//   { href: "#contact", label: "Contact" },
// ];

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-2 border-green-500 rounded-lg">
      <nav className="mx-auto justify-between flex items-center px-4 py-3">
        <a href="/">
          <span className="font-extrabold  text-2xl text-green-500">
            StreamIt
          </span>
        </a>

        <input
          type="text"
          className="border-2 border-green-500 px-4 py-2 rounded-full outline-0 md:w-2xl  bg-transparent text-white"
          placeholder="Search"
        />

        <div className="cursor-pointer">
          <Image
            src="/pfp.jpg"
            alt="pfp"
            width={40}
            height={40}
            className="rounded-full border-2 border-green-500"
          ></Image>
        </div>

        {/* <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button> */}
      </nav>

      {/* {isOpen && (
        <ul className="flex bg-bg absolute w-full flex-col items-center gap-4 md:hidden border-b border-white/5 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )} */}
    </header>
  );
};

export default Navbar;
