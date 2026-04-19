import Image from "next/image";
import VideoCard from "@/components/ui/videoCard";

async function getChannel(username: string) {
  const res = await fetch(`http://localhost:5001/api/channel/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch channel");

  return res.json();
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

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-green-500 text-sm">@{user.username}</p>
          <p className="text-slate-400 mt-2 text-sm max-w-md">
            {user.bio || "No bio available."}
          </p>
        </div>

        {/* (later) Subscribe button */}
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
