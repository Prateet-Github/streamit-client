"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, PlayCircle } from "lucide-react";
import UploadModal from "@/components/modals/UploadModal";
import VideoCard from "@/components/ui/videoCard";
import api from "@/services/api";

type Video = {
  _id: string;
  title: string;
  thumbnailKey: string;
  createdAt: string;
  views?: number;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  processingProgress?: number;
  owner?: {
    id: string;
    name: string;
  };
};

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/video/my-videos");
        setVideos(data);

        const isProcessing = data.some((v: Video) => v.status === "PROCESSING");

        if (isProcessing) {
          timeout = setTimeout(fetchVideos, 5000); // polling every 5 seconds if any video is still processing
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Your <span className="text-green-500 font-mono">Studio</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
            Distributed Asset Manager
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="text-sm uppercase tracking-tight">New Upload</span>
        </button>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-green-500" size={32} />
            <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">
              Pinging Workers...
            </p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => {
              const isProcessing = video.status === "PROCESSING";
              const isFailed = video.status === "FAILED";

              return (
                <div
                  key={video._id}
                  className={`relative group ${
                    video.status !== "COMPLETED"
                      ? "pointer-events-none opacity-70"
                      : ""
                  }`}
                >
                  {/* PROCESSING Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/5">
                      <Loader2
                        className="animate-spin text-green-500"
                        size={24}
                      />
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                        Transcoding
                      </span>

                      {/* Progress */}
                      <span className="text-xs text-slate-400">
                        {video.processingProgress || 0}%
                      </span>
                    </div>
                  )}

                  {/* FAILED Overlay */}
                  {isFailed && (
                    <div className="absolute inset-0 z-10 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-red-500/30">
                      <span className="text-red-400 text-xs font-mono uppercase tracking-widest">
                        Failed
                      </span>
                    </div>
                  )}

                  <VideoCard
                    id={video._id}
                    title={video.title}
                    thumbnail={
                      video.status === "COMPLETED"
                        ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`
                        : "/placeholder.jpg"
                    }
                    channelName=" "
                    views={video.views || 0}
                    createdAt={video.createdAt}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="border-2 border-dashed border-white/5 rounded-[3rem] h-[50vh] flex flex-col items-center justify-center gap-6 bg-white/1">
            <div className="p-6 rounded-full bg-white/5 text-slate-700">
              <PlayCircle size={48} strokeWidth={1} />
            </div>
            <div className="text-center">
              <p className="text-slate-400 font-bold text-lg">
                No assets found
              </p>
              <p className="text-slate-600 text-sm mt-1">
                Initialize your first pipeline job to get started.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          window.location.reload(); // force refresh after upload
        }}
      />
    </div>
  );
}
