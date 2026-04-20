"use client";

import { useSubscriptionStatus, useToggleSubscription } from "@/queries/subscription";

export default function SubscribeButton({ channelId }: { channelId: string }) {
  const { data, isLoading } = useSubscriptionStatus(channelId);
  const toggle = useToggleSubscription(channelId);

  if (isLoading) {
    return (
      <button className="px-5 py-2 rounded-full bg-white/10 text-sm">
        Loading...
      </button>
    );
  }

  const isSubscribed = data?.isSubscribed;

  return (
    <button
      onClick={() => toggle.mutate()}
      className={`px-6 py-2 rounded-full text-sm font-bold transition ${
        isSubscribed
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-green-500"
      }`}
    >
      {toggle.isPending
        ? "..."
        : isSubscribed
        ? "Subscribed"
        : "Subscribe"}
    </button>
  );
}