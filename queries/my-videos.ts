import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Video } from "@/types/video";

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