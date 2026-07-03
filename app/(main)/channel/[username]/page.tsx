import Image from "next/image";
import VideoCard from "@/components/ui/videoCard";
import SubscribeButton from "@/components/ui/SubscriptionButton";
import ChannelHeader from "@/components/ui/ChannelHeader";

async function getChannel(username: string) {
  const res = await fetch(`http://localhost:8080/api/channels/${username}`, {
    cache: "no-store",
  });

  console.log("status", res.status);

  const text = await res.text();
  // console.log(text);

  if (!res.ok) throw new Error("Failed to fetch channel");

  return JSON.parse(text);
}

export default async function Channel({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const data = await getChannel(username);

  const { user, videos } = data;

  return (
    <main className="min-h-screen text-slate-200 p-4 md:p-8">
      {/* PROFILE HEADER */}
      <section className="mb-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-green-500/20">
          <Image src="/pfp.jpg" alt={user.name} fill className="object-cover" />
        </div>

        <ChannelHeader user={user} />
      </section>

      {/* VIDEOS */}
      <section>
        <h2 className="text-xl font-bold mb-6">Videos ({videos.length})</h2>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: any) => (
              <VideoCard
                key={video._id}
                id={video._id}
                title={video.title}
                thumbnail={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${video.thumbnailKey}`}
                channelName={user.name}
                avatar="/pfp.jpg"
                createdAt={video.createdAt}
                showActions={false}
                views={0}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No videos yet</p>
        )}
      </section>
    </main>
  );
}
