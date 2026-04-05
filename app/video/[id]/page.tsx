import VideoPlayer from "@/components/ui/VideoPlayer";

type Video = {
  hlsUrl: string;
  title: string;
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
  // nextjs issue params must be a promise so await it here
  const { id } = await params;

  const video = await getVideo(id);

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <VideoPlayer src={video.hlsUrl} />
    </div>
  );
}
