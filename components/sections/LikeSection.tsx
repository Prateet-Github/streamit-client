"use client";

import { ThumbsUp } from "lucide-react";
import { useLikeData, useLikeVideo, useUnlikeVideo } from "@/queries/like";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "@/queries/auth";

export default function LikeSection({ videoId }: { videoId: string }) {
  const { data, isLoading } = useLikeData(videoId);
  const { data: currentUser } = useCurrentUser();

  const likeVideo = useLikeVideo();
  const unlikeVideo = useUnlikeVideo();

  const liked = data?.liked ?? false;
  const likesCount = data?.likesCount ?? 0;

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please login to like videos.");
      return;
    }

    if (liked) {
      unlikeVideo.mutate(videoId);
    } else {
      likeVideo.mutate(videoId);
    }
  };

  return (
    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
      <button
        onClick={handleLike}
        disabled={likeVideo.isPending || unlikeVideo.isPending}
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
