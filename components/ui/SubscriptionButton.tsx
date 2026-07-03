"use client";

import {
  useSubscribe,
  useSubscriptionData,
  useUnsubscribe,
} from "@/queries/subscription";

export default function SubscribeButton({ channelId }: { channelId: string }) {
  const { data, isLoading } = useSubscriptionData(channelId);

  const subscribe = useSubscribe();
  const unsubscribe = useUnsubscribe();

  const subscribed = data?.subscribed ?? false;
  const subscribersCount = data?.subscribersCount ?? 0;

  const handleSubscribe = () => {
    if (subscribed) {
      unsubscribe.mutate(channelId);
    } else {
      subscribe.mutate(channelId);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleSubscribe}
        disabled={subscribe.isPending || unsubscribe.isPending}
        className={`px-6 py-2 rounded-full text-sm font-bold transition ${
          subscribed
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-white text-black hover:bg-green-500"
        }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>

      <span className="text-sm text-slate-400">
        {isLoading ? "..." : subscribersCount} subscribers
      </span>
    </div>
  );
}
