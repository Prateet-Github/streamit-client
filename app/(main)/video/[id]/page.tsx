import VideoPlayer from "@/components/ui/VideoPlayer";
import Image from "next/image";
import { Share2, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { Video } from "@/types/video";
import UpNext from "@/components/sections/UpNext";
import LikeSection from "@/components/sections/LikeSection";
import CommentSection from "@/components/sections/CommentSection";
import Link from "next/link";

async function getVideo(id: string): Promise<Video> {
  const res = await fetch(`http://localhost:5001/api/video/${id}`, {
    cache: "no-store",
    // next: { revalidate: 10 }
  });

  if (!res.ok) throw new Error("Failed to fetch video");

  return res.json();
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideo(id);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Player & Metadata */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
            <VideoPlayer src={video.hlsUrl} />
          </div>

          {/* Video Info Header */}
          <div className="px-2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {video.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
              {/* Creator Info */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-green-500/20">
                  <Image
                    src="/pfp.jpg"
                    alt={video.owner?.name || "Channel"}
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white hover:text-green-500 transition-colors cursor-pointer">
                      <Link href={`/channel/${video.owner?.username}`}>
                        {video.owner?.name}
                      </Link>
                    </span>
                    <CheckCircle2 size={14} className="text-green-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    @{video.owner?.username || "unknown_user"}
                  </p>
                </div>
                <button className="ml-4 bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-green-500 transition-all active:scale-95">
                  Subscribe
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-l-full border-r border-white/10 transition-all">
                    <ThumbsUp size={18} className="text-slate-400" />{" "}
                    <span className="text-xs font-bold">12K</span>
                  </button>
                  <button className="px-4 py-2 hover:bg-white/5 rounded-r-full transition-all">
                    <ThumbsUp size={18} className="rotate-180 text-slate-400" />
                  </button>
                </div> */}
                <LikeSection videoId={id} />
                <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
                  <Share2 size={18} /> Share
                </button>
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl group transition-all hover:bg-white/4">
              <div className="flex gap-4 text-xs font-mono font-bold text-green-500/80 mb-3 uppercase tracking-widest">
                <span>142K views</span>
                <span>April 2026</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                {video.description ||
                  "No description provided for this pipeline asset."}
              </p>
            </div>

            <CommentSection videoId={id} />
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Up Next) */}
        <UpNext />
      </div>
    </main>
  );
}
