"use client";

import { Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

type Props = {
  videoId: string;
  title: string;
};

export default function ShareButton({ videoId, title }: Props) {
  const handleShare = async () => {
    const url = `${window.location.origin}/video/${videoId}`;

    try {
      if (navigator.share) {
        // navigator.share is used for mobile devices to share content via the native share sheet(new thing to me)
        await navigator.share({
          title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to share");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
    >
      <Share2 size={18} />
      Share
    </button>
  );
}
