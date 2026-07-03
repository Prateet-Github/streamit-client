"use client";

import Link from "next/link";
import { useMySubscriptions } from "@/queries/subscription";

const Subscriptions = () => {
  const { data, isLoading } = useMySubscriptions();
  console.log("subscriptions data", data);

  return (
    <div className="min-h-screen md:p-4">
      <header className="mb-12 p-4 md:p-0">
        <h1 className="text-4xl font-bold text-white tracking-tighter">
          Your <span className="text-green-500 font-mono">Subscriptions</span>
        </h1>

        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
          {isLoading
            ? "Loading..."
            : `${data?.length ?? 0} subscribed channel${data?.length === 1 ? "" : "s"}`}
        </p>
      </header>

      {isLoading ? (
        <p className="text-slate-500">Loading subscriptions...</p>
      ) : data?.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-white font-semibold">
            No subscriptions yet
          </h2>

          <p className="text-slate-500 mt-2">
            Subscribe to your favorite creators to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:p-0">
          {data.map((channel: any) => (
            <Link
              key={channel.id}
              href={`/channel/${channel.username}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xl">
                  {channel.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-white font-semibold">{channel.name}</h2>

                  <p className="text-slate-400 text-sm">@{channel.username}</p>

                  {channel.bio && (
                    <p className="text-slate-500 text-sm mt-1">{channel.bio}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-semibold">
                  {channel.subscribersCount}
                </p>

                <p className="text-slate-500 text-xs uppercase tracking-wide">
                  Subscribers
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
