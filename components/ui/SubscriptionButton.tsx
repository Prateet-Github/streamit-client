"use client";

import {
  useSubscriptionStatus,
  useToggleSubscription,
} from "@/queries/subscription";

export default function SubscribeButton({ channelId }: { channelId: string }) {
  const { data } = useSubscriptionStatus(channelId);
  const toggle = useToggleSubscription(channelId);

  const isSubscribed = data?.isSubscribed;
  const count = data?.subscribersCount ?? 0;

  return (
    <div className="flex items-center gap-4">
      {/* Button */}
      <button
        onClick={() => toggle.mutate()}
        className={`px-6 py-2 rounded-full text-sm font-bold transition ${
          isSubscribed
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-white text-black hover:bg-green-500"
        }`}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>

      {/* Count */}
      <span className="text-sm text-slate-400">{count} subscribers</span>
    </div>
  );
}
