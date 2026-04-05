"use client";

import Image from "next/image";
import { Settings, Edit3, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { formatDate } from "@/utils/time";
import { User } from "@/types/user";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-500 font-mono text-xs uppercase tracking-widest">
        <Loader2 className="animate-spin text-green-500" size={24} />
        Syncing Profile...
      </div>
    );
  }

  return (
    <main className="min-h-screen text-slate-200">
      <div className="">
        {/* Header Card */}
        <section className="bg-[#0d0d0d] border border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Avatar Container */}
            <div className="shrink-0">
              <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full p-1 border-2 border-green-500/20">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src="/pfp.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left space-y-3 mt-2">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                  {user.name}
                </h1>
                <p className="text-green-500 font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-semibold">
                  @{user.username}
                </p>
              </div>

              <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed mx-auto md:mx-0">
                Full Stack Engineer & Video Infrastructure Enthusiast.
                Architecting distributed processing pipelines.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 text-black px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-green-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <Edit3 size={18} />
                <span className="md:hidden lg:inline">Edit Profile</span>
              </button>

              <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* User Meta Stats  */}
          <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Assets
              </p>
              <p className="text-xl font-bold text-white">24</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Views
              </p>
              <p className="text-xl font-bold text-white">1.2k</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Joined
              </p>
              <p className="text-xl font-bold text-white">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
