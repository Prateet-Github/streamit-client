import Image from "next/image";
import Link from "next/link";

type VideoCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: number;
  createdAt: string;
  avatar?: string;
};

export default function VideoCard({
  id,
  title,
  thumbnail,
  channelName,
  views,
  createdAt,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`} className="flex flex-col gap-2 group">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          10:25
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <Image
            src="/pfp.jpg"
            alt={channelName}
            width={36}
            height={36}
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>

          <p className="text-sm text-gray-400">{channelName}</p>

          <p className="text-xs text-gray-500">
            {views} views • {createdAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
