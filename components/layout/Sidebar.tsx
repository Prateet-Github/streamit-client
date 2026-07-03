"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItems as items } from "@/data/navItems";

type SidebarProps = {
  isSidebarOpen: boolean;
};

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300 hidden md:flex border-r border-white/5 bg-[#0d0d0d] text-white overflow-hidden`}
    >
      <nav className="flex flex-col gap-2 p-2 w-full">
        {items.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center rounded-xl p-3 transition-colors ${
                isSidebarOpen ? "gap-3 justify-start" : "justify-center"
              } ${
                active
                  ? "bg-green-500 text-black"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <Icon size={22} />

              {isSidebarOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
