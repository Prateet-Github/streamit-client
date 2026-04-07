"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "@/hooks/useClickOutside";
import { Search, Menu, X, Home } from "lucide-react";
import { useCurrentUser } from "@/queries/auth";
import { usePathname } from "next/navigation";
import { NavItems as items } from "@/data/navItems";
import { useSearchVideos } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";

type NavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export default function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
}: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const debouncedSearch = useDebounce(search, 500);

  const { data: currentUser, isLoading } = useCurrentUser();
  const { data: results = [], isLoading: isSearching } =
    useSearchVideos(debouncedSearch);
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="sticky top-0 bg-[#0d0d0d] z-50 backdrop-blur-md border-b border-white/5 text-white">
        <nav className="flex items-center justify-between px-3 py-3 md:px-3">
          {/* LEFT: Logo & Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors md:block hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/"
              className="font-bold text-xl md:text-2xl tracking-tighter flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black">
                <Home size={18} fill="black" />
              </div>
              <span className="hidden sm:inline-block text-green-500">
                StreamIt
              </span>
            </Link>
          </div>

          {/* SEARCH */}
          <div className="relative w-full max-w-md md:max-w-sm lg:max-w-md mx-4 md:mx-0 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full bg-white/5 border border-white/10 px-10 py-2.5 rounded-2xl outline-none focus:border-green-500/50"
            />
            {isFocused && search && (
              <div className="absolute  top-full mt-2 w-full bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-sm text-slate-400">Searching...</div>
                ) : results.length > 0 ? (
                  results.map((video: any) => (
                    <Link
                      key={video._id}
                      href={`/video/${video._id}`}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 transition"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`}
                        alt={video.title}
                        width={60}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <p className="text-sm line-clamp-2">{video.title}</p>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-sm text-slate-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Profile/Auth */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
            ) : currentUser ? (
              <div className="relative" ref={profileRef}>
                <div
                  className={`p-0.5 rounded-full border-2 transition-all cursor-pointer ${isProfileOpen ? "border-green-500" : "border-transparent"}`}
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                >
                  <Image
                    src="/pfp.jpg"
                    alt="profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                    priority
                    sizes="128px"
                  />
                </div>

                {isProfileOpen && (
                  <ProfileDropdown
                    closeDropdown={() => setIsProfileOpen(false)}
                  />
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-bold hover:text-green-500 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-green-500 text-black px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-400 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-xl border-t border-white/5 px-4 py-3">
        <div className="grid grid-cols-3 items-center">
          {items.map(({ label, icon: Icon, href }) => (
            <MobileNavItem
              key={label}
              href={href}
              icon={Icon}
              label={label}
              active={pathname === href}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function MobileNavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: any;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90"
    >
      <Icon
        size={20}
        strokeWidth={active ? 2.5 : 2}
        className={active ? "text-green-500" : "text-slate-500"}
      />
      <span
        className={`text-[9px] font-mono uppercase tracking-widest ${active ? "text-green-500 font-bold" : "text-slate-600"}`}
      >
        {label}
      </span>
    </Link>
  );
}
