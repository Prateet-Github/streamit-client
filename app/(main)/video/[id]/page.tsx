import VideoPlayer from "@/components/ui/VideoPlayer";
import Image from "next/image";
import {
  ThumbsUp,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Play,
} from "lucide-react";

type Video = {
  hlsUrl: string;
  title: string;
  description: string;
  owner?: {
    name: string;
    username: string;
  };
};

async function getVideo(id: string): Promise<Video> {
  const res = await fetch(`http://localhost:5001/api/video/${id}`, {
    cache: "no-store",
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white hover:text-green-500 transition-colors cursor-pointer">
                      {video.owner?.name || "StreamIt Creator"}
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
                <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-l-full border-r border-white/10 transition-all">
                    <ThumbsUp size={18} className="text-slate-400" />{" "}
                    <span className="text-xs font-bold">12K</span>
                  </button>
                  <button className="px-4 py-2 hover:bg-white/5 rounded-r-full transition-all">
                    <ThumbsUp size={18} className="rotate-180 text-slate-400" />
                  </button>
                </div>
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
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Up Next) */}
        <aside className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
              Up Next
            </h3>
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
              Autoplay On
            </span>
          </div>

          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 group cursor-pointer group">
                {/* Small Thumbnail Preview */}
                <div className="relative w-40 aspect-video bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={20} className="text-green-500" />
                  </div>
                </div>

                {/* Sidebar Metadata */}
                <div className="space-y-1 py-1">
                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-green-500 transition-colors">
                    Distributed Pipeline Systems: Vol. {i}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">
                    StreamIt Engineering
                  </p>
                  <p className="text-[10px] text-slate-600">
                    42K views • 1 day ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
