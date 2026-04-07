import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useSearchVideos = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await api.get(`/video/search?q=${query}`);
      return res.data;
    },
    enabled: !!query,
    staleTime: 1000 * 30,
  });
};