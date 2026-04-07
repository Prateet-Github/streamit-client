"use client";

import Image from "next/image";
import { Settings, Edit3, Loader2 } from "lucide-react";
import { formatDate } from "@/utils/time";
import { useCurrentUser } from "@/queries/auth";

const Profile = () => {
  const { data: currentUser, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <Loader2 className="animate-spin text-green-500" size={32} />
        <p className="text-slate-600 text-xs uppercase">Loading profile...</p>
      </div>
    );
  }

  if (isError || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load profile
      </div>
    );
  }

  return (
    <main className="min-h-screen text-slate-200 md:p-4">
      <section className="bg-[#0d0d0d] border border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Avatar */}
          <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden border-2 border-green-500/20">
            <Image
              src="/pfp.jpg"
              alt="Profile"
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {currentUser.name}
            </h1>
            <p className="text-green-500 font-mono text-xs uppercase tracking-widest">
              @{currentUser.username}
            </p>

            <p className="text-slate-500 mt-2 text-sm max-w-md">
              Full Stack Engineer & Video Infrastructure Enthusiast.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="bg-green-500 px-5 py-3 rounded-xl text-black font-bold hover:bg-green-400">
              <Edit3 size={16} />
            </button>
            <button className="p-3 bg-white/5 rounded-xl">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
          <div>
            <p className="text-xs text-slate-500">Assets</p>
            <p className="text-xl font-bold">24</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Views</p>
            <p className="text-xl font-bold">1.2k</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Joined</p>
            <p className="text-xl font-bold">
              {formatDate(currentUser.createdAt)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
