"use client";

import Image from "next/image";
import { Settings, Edit3, Loader2 } from "lucide-react";
import { formatDate } from "@/utils/time";
import { useCurrentUser } from "@/queries/auth";
import { useUpdateProfile } from "@/queries/auth";
import { useState, useEffect } from "react";
import { useSubscriptionStatus } from "@/queries/subscription";

const Profile = ({ channelId }: { channelId: string }) => {
  const { data: currentUser, isLoading, isError, error } = useCurrentUser();
  const { data } = useSubscriptionStatus(channelId);

  const count = data?.subscribersCount ?? 0;

  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // sync state when user loads
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setBio(currentUser.bio || "");
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <Loader2 className="animate-spin text-green-500" size={32} />
        <p className="text-slate-600 text-xs uppercase">Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    const err = error as any;

    if (err?.response?.status === 401) {
      return (
        <div className="min-h-screen flex items-center justify-center text-green-500">
          Please login to view your profile.
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Something went wrong.
      </div>
    );
  }

  return (
    <main className="min-h-screen text-slate-200 md:p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 p-4 md:p-0">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Your <span className="text-green-500 font-mono">Profile</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
            View and edit your profile information.
          </p>
        </div>
      </header>

      {/* Profile Card */}
      <section className="bg-[#0d0d0d] border border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl mb-6">
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
            {isEditing ? (
              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
                />

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
                  placeholder="Add a bio..."
                />

                <div className="flex gap-2 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      updateProfile.mutate(
                        { name, bio },
                        {
                          onSuccess: () => setIsEditing(false),
                        },
                      )
                    }
                    className="bg-green-500 px-4 py-2 rounded-xl text-black font-bold"
                  >
                    {updateProfile.isPending ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {currentUser.name}
                </h1>

                <p className="text-green-500 font-mono text-xs uppercase tracking-widest">
                  @{currentUser.username}
                </p>

                <p className="text-slate-500 mt-2 text-sm max-w-md">
                  {currentUser.bio || "No bio added yet."}
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="bg-green-500 px-5 py-3 rounded-xl text-black font-bold hover:bg-green-400"
            >
              <Edit3 size={16} />
            </button>

            <button className="p-3 bg-white/5 rounded-xl">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-10 flex flex-wrap gap-8 border-t border-white/5 pt-6">
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
          <div>
            <p className="text-xs text-slate-500">Subscribers</p>
            <p className="text-xl font-bold">{count}</p>
          </div>
        </div>
      </section>

      {/* History */}
      <header className="flex justify-between items-center mb-12 p-4 md:p-0">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Your <span className="text-green-500 font-mono">History</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
            Watch history management coming soon!
          </p>
        </div>
      </header>

      {/* Playlists */}
      <header className="flex justify-between items-center mb-12 p-4 md:p-0">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Your <span className="text-green-500 font-mono">Playlists</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
            Playlist management coming soon!
          </p>
        </div>
      </header>
    </main>
  );
};

export default Profile;
