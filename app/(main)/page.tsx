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
    <div className="min-h-screen">
      <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
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
