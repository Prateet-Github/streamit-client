import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) =>
      api.post(`/like/${videoId}`),

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
      const res = await api.get(`/like/${videoId}`);
      return res.data;
    },
  });
};