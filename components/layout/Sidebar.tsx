import Link from "next/link";
import { Home, Upload, Video, User } from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
};

const items = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Upload Video", icon: Upload, href: "/upload-video" },
  { label: "Dashboard", icon: Video, href: "/dashboard" },

  { label: "Profile", icon: User, href: "/profile" },
];

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300  bg-white dark:bg-black border border-green-500 text-black dark:text-white h-screen-[calc(100vh-16)] overflow-hidden`}
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
