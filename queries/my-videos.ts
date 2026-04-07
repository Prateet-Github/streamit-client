import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type Video = {
  views: number;
  _id: string;
  title: string;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  thumbnailKey?: string;
  createdAt: string;
};

export const useMyVideos = () => {
  return useQuery<Video[]>({
    queryKey: ["myVideos"],

    queryFn: async () => {
      const res = await api.get("/video/my-videos");
      return res.data;
    },

    staleTime: 1000 * 10,

    refetchInterval: (query) => {
      const data = query.state.data;

      const isProcessing = data?.some(
        (v) => v.status === "PROCESSING"
      );

      return isProcessing ? 5000 : false;
    }
  });
};