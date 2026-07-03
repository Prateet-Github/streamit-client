"use client";

import SubscribeButton from "./SubscriptionButton";

type Props = {
  user: {
    id: string;
    name: string;
    username: string;
    bio: string;
  };
};

export default function ChannelHeader({ user }: Props) {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-bold">{user.name}</h1>

      <p className="text-green-500 text-sm">@{user.username}</p>

      <p className="text-slate-400 mt-2 text-sm max-w-md">
        {user.bio || "No bio available."}
      </p>

      <div className="mt-4">
        <SubscribeButton channelId={user.id} />
      </div>
    </div>
  );
}
