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

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["subscription", channelId],
      });

      const prev = queryClient.getQueryData<any>([
        "subscription",
        channelId,
      ]);

      queryClient.setQueryData(["subscription", channelId], (old: any) => {
        if (!old) return old;

        const isSubscribed = !old.isSubscribed;

        return {
          ...old,
          isSubscribed,
          subscribersCount: old.subscribersCount + (isSubscribed ? 1 : -1),
        };
      });

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["subscription", channelId],
        context?.prev
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", channelId],
      });
    },
  });
};