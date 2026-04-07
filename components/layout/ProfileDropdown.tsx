"use client";

import Image from "next/image";
import { LogOut, ChevronRight } from "lucide-react";
import { useCurrentUser } from "@/queries/auth";
import useLogout from "@/hooks/useLogout";
import Link from "next/link";
import { menuItems } from "@/data/dropDownItems";

type ProfileDropdownProps = {
  closeDropdown: () => void;
};

export default function ProfileDropdown({
  closeDropdown,
}: ProfileDropdownProps) {
  const { data: currentUser, isLoading } = useCurrentUser();
  const logout = useLogout();

  if (isLoading) {
    return (
      <div className="absolute right-0 top-14 w-64 p-6 bg-[#0d0d0d] border border-white/5 rounded-4xl shadow-2xl animate-pulse">
        <div className="h-4 w-24 bg-white/5 rounded-full mb-2" />
        <div className="h-3 w-32 bg-white/5 rounded-full" />
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-14 w-72 bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-60">
      {/* Header Section */}
      <div className="p-6 bg-white/2 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border border-green-500/20">
            <Image
              src="/pfp.jpg"
              alt="profile"
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {currentUser?.name || currentUser?.username}
            </p>
            <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest truncate">
              @{currentUser?.username || "creator"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-3 space-y-1">
        {menuItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={closeDropdown}
            className="flex items-center justify-between group w-full p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-green-500/10 group-hover:text-green-500 transition-all">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium tracking-tight">
                {label}
              </span>
            </div>
            <ChevronRight
              size={14}
              className="text-slate-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all"
            />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="p-3 bg-white/1">
        <button
          onClick={() => {
            logout();
            closeDropdown();
          }}
          className="flex items-center gap-3 w-full p-3 rounded-2xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
        >
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-red-500/10">
            <LogOut size={18} strokeWidth={1.5} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-[10px]">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}
