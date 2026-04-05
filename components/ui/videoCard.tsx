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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export default function VideoCard({
  id,
  title,
  thumbnail,
  channelName,
  views,
  createdAt,
  avatar,
}: VideoCardProps) {
  return (
    <Link href={`/video/${id}`} className="flex flex-col gap-2 group">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 50vw,
         (max-width: 1024px) 33vw,
         25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          10:25
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <Image
            src={avatar || "/pfp.jpg"}
            alt={channelName}
            width={36}
            height={36}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 wrap-break-word">
            {title}
          </h3>

          <p className="text-sm text-gray-400">{channelName}</p>

          <p className="text-xs text-gray-500">
            {views.toLocaleString()} views • {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
