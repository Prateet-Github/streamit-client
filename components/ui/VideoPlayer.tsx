"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useHeartbeat } from "@/queries/video-count";
import { getViewerId } from "@/utils/viewer";

type Props = {
  videoId: string;
  src: string;
};

export default function VideoPlayer({ videoId, src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Next checkpoint to send
  const nextCheckpointRef = useRef(10);

  const heartbeat = useHeartbeat();

  // HLS Setup
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  // Heartbeat Lifecycle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log("Playing");
    };

    const handlePause = () => {
      console.log("Paused");
    };

    const handleEnded = () => {
      console.log("Ended");

      // Reset for next playback
      nextCheckpointRef.current = 10;
    };

    const handleTimeUpdate = () => {
      const current = Math.floor(video.currentTime);

      if (current >= nextCheckpointRef.current) {
        console.log(`Heartbeat sent: ${nextCheckpointRef.current}s`);

        heartbeat.mutate({
          videoId,
          elapsed: nextCheckpointRef.current,
          viewerId: getViewerId(),
        });

        nextCheckpointRef.current += 10;
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoId, heartbeat]);

  return (
    <video ref={videoRef} controls className="w-full h-full object-contain" />
  );
}
