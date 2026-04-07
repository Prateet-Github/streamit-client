"use client";

import Image from "next/image";
import Link from "next/link";
import { formatTime } from "@/utils/time";
import { VideoCardProps } from "@/types/video";
import { useDeleteVideo } from "@/queries/delete-video";
import { CircleX } from "lucide-react";

export default function VideoCard({
  id,
  title,
  thumbnail,
  channelName,
  createdAt,
  avatar,
  showActions,
}: VideoCardProps) {
  const { mutate: deleteVideo } = useDeleteVideo();

  return (
    <Link
      href={`/video/${id}`}
      className="flex flex-col gap-3 md:hover:scale-102 transition-transform duration-300 bg-[#0d0d0d] text-white"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden md:rounded-2xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 50vw,
         (max-width: 1024px) 33vw,
         25vw"
          priority
          className="object-cover"
        />

        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          10:25
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3 px-4 md:px-0">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <Image
            src={avatar || "/pfp.jpg"}
            alt={channelName}
            sizes="128px"
            width={36}
            height={36}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 wrap-break-word">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <p className="text-sm text-gray-400">{channelName}</p>{" "}
            <span className="text-xs text-gray-500">•</span>
            <p className="text-xs text-gray-500">
              10 views • {formatTime(createdAt)}
            </p>
          </div>
        </div>

        {
          // Delete button

          showActions && (
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteVideo(id);
              }}
              className="ml-auto p-2 rounded-full text-red-500 font-bold transition-colors cursor-pointer hover:bg-red-500/10"
            >
              <CircleX size={20} />
            </button>
          )
        }
      </div>
    </Link>
  );
}
