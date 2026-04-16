"use client";

import { ThumbsUp } from "lucide-react";
import { useLikeData, useToggleLike } from "@/queries/like";

export default function LikeSection({ videoId }: { videoId: string }) {
  const { data, isLoading } = useLikeData(videoId);
  const toggleLike = useToggleLike();

  const liked = data?.liked;
  const likesCount = data?.likesCount || 0;

  const handleLike = () => {
    toggleLike.mutate(videoId);
  };

  return (
    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full border-r border-white/10 transition-all"
      >
        <ThumbsUp
          size={18}
          className={liked ? "text-green-500" : "text-slate-400"}
        />
        <span className="text-xs font-bold">
          {isLoading ? "..." : likesCount}
        </span>
      </button>
    </div>
  );
}
