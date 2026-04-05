import VideoCard from "@/components/ui/videoCard";

type Video = {
  _id: string;
  title: string;
  thumbnailKey: string;
  createdAt: string;
  views: number;
};

async function getVideos(): Promise<Video[]> {
  const res = await fetch(
    "http://localhost:5001/api/video",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          id={video._id}
          title={video.title}
          thumbnail={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`}
          channelName="Streamit"
          views={video.views || 0}
          createdAt={video.createdAt}
        />
      ))}
    </div>
  );
}