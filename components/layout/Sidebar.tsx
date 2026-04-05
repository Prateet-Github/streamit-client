import Link from "next/link";
import { NavItems as items } from "@/data/navItems";

type SidebarProps = {
  isSidebarOpen: boolean;
};

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300 hidden md:flex  border-r border-white/5  dark:bg-[#0d0d0d] text-white h-screen-[calc(100vh-16)] overflow-hidden`}
    >
      <nav className="flex flex-col gap-2 p-2">
        {items.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center rounded hover:bg-white/10 p-3 ${
              isSidebarOpen ? "gap-3 justify-start" : "justify-center"
            }`}
          >
            <Icon size={22} />

            {isSidebarOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
