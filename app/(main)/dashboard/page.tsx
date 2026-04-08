"use client";

import { useState } from "react";
import { Plus, Loader2, PlayCircle } from "lucide-react";
import UploadModal from "@/components/modals/UploadModal";
import VideoCard from "@/components/ui/videoCard";
import { useMyVideos } from "@/queries/my-videos";

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const {
    data: videos = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useMyVideos();

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <Loader2 className="animate-spin text-green-500" size={32} />
        <p className="text-slate-600 text-xs uppercase">Loading dashboard...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    const err = error as any;

    if (err?.response?.status === 401) {
      return (
        <div className="min-h-screen flex items-center justify-center text-green-500">
          Please login to view your dashboard
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg font-semibold">
          Something went wrong
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 p-4 md:p-0">
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
          className="flex items-center gap-2 bg-green-500 hover:scale-105 duration-200 text-black px-4 py-3 rounded-2xl font-bold active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="text-sm uppercase hidden md:flex">New Upload</span>
        </button>
      </header>

      {/* Content */}
      <section>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => {
              const isProcessing = video.status === "PROCESSING";
              const isFailed = video.status === "FAILED";

              return (
                <div key={video._id} className="relative group">
                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3">
                      {/* Spinner */}
                      <Loader2
                        className="animate-spin text-green-500"
                        size={28}
                      />

                      {/* Text */}
                      <span className="text-xs text-white uppercase tracking-widest">
                        Processing
                      </span>

                      <div className="w-24 h-0.5 bg-green-500/30 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-green-500 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Failed */}
                  {isFailed && (
                    <div className="absolute inset-0 z-10 bg-red-500/20 rounded-2xl flex items-center justify-center">
                      <span className="text-red-400 text-xs uppercase">
                        Failed
                      </span>
                    </div>
                  )}

                  {/* Video Card */}
                  <VideoCard
                    showActions
                    id={video._id}
                    title={video.title}
                    thumbnail={
                      video.status === "COMPLETED"
                        ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`
                        : "/fallback.png"
                    }
                    channelName="Streamit"
                    views={video.views || 0}
                    createdAt={video.createdAt}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
            <PlayCircle size={48} className="text-slate-600" />
            <p className="text-slate-400">No videos yet</p>
          </div>
        )}
      </section>

      {/* Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          refetch();
        }}
      />
    </div>
  );
}
