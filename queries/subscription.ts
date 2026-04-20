import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export const useSubscriptionStatus = (channelId: string) => {
  return useQuery({
    queryKey: ["subscription", channelId],
    queryFn: async () => {
      const res = await api.get(`/subscription/${channelId}`);
      return res.data;
    },
    enabled: !!channelId,
  });
};

export const useToggleSubscription = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post(`/subscription/${channelId}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", channelId],
      });
    },
  });
};