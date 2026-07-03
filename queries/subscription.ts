import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export const useSubscriptionData = (channelId: string) => {
  return useQuery({
    queryKey: ["subscription", channelId],
    queryFn: async () => {
      const { data } = await api.get(`/subscriptions/${channelId}`);
      return data;
    },
    enabled: !!channelId,
  });
};

export const useMySubscriptions = () => {
  return useQuery({
    queryKey: ["my-subscriptions"],
    queryFn: async () => {
      const { data } = await api.get("/subscriptions/");
      console.log("my subscriptions data", data);
      return data;
    },
  });
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId: string) =>
      api.post(`/subscriptions/${channelId}`),

    onSuccess: (_, channelId) => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", channelId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-subscriptions"],
      });
    },
  });
};

export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId: string) =>
      api.delete(`/subscriptions/${channelId}`),

    onSuccess: (_, channelId) => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", channelId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-subscriptions"],
      });
    },
  });
};