import VideoCard from "@/components/ui/videoCard";
import { Video } from "@/types/video";

async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen md:p-4">
      <header className="flex justify-between items-center mb-12 p-4 md:p-0">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Trending <span className="text-green-500 font-mono">Videos</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
            Updated daily based on views and engagement
          </p>
        </div>
      </header>
      <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            showActions={false}
            key={video._id}
            id={video._id}
            title={video.title}
            thumbnail={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`}
            channelName={video.owner?.name || "New Channel"}
            views={video.views || 0}
            createdAt={video.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
