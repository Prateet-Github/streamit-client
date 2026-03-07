import Link from "next/link";
import { Home, Users, History } from "lucide-react";

const items = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Subscriptions", icon: Users, href: "/subscriptions" },
  { label: "History", icon: History, href: "/history" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border border-green-500 p-4">
      <nav className="flex flex-col gap-2">
        {items.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 p-2 rounded hover:bg-white/10"
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}