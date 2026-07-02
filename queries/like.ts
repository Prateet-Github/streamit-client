import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useLikeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) =>
      api.post(`/videos/${videoId}/like`),

    onSuccess: (_, videoId) => {
      queryClient.invalidateQueries({
        queryKey: ["like", videoId],
      });
    },
  });
};

export const useUnlikeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) =>
      api.delete(`/videos/${videoId}/like`),

    onSuccess: (_, videoId) => {
      queryClient.invalidateQueries({
        queryKey: ["like", videoId],
      });
    },
  });
};


export const useLikeData = (videoId: string) => {
  return useQuery({
    queryKey: ["like", videoId],
    queryFn: async () => {
      const { data } = await api.get(`/videos/${videoId}/like`);
      return data;
    },
  });
};