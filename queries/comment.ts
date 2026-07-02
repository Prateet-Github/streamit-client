import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useAddComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      const { data } = await api.post(`/comments/video/${videoId}`, {
        content,
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};

export const useReplies = (
  commentId: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["replies", commentId],

    queryFn: async () => {
      const res = await api.get(`/comments/${commentId}/replies`);
      return res.data;
    },

    enabled, // fetch ONLY when user clicks "view replies"
    staleTime: 1000 * 60,
  });
};



export const useComments = (videoId: string) => {
  return useQuery({
    queryKey: ["comments", videoId],

    queryFn: async () => {
      const res = await api.get(`/comments/video/${videoId}`);
      return res.data;
    },

    enabled: !!videoId, // don't fetch if videoId is falsy
    staleTime: 1000 * 30, // cache for 30s
  });
};

export const useAddReply = (
  commentId: string,
  videoId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      const { data } = await api.post(
        `/comments/${commentId}/replies`,
        {
          content,
        },
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", commentId],
      });

      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};

export const useDeleteComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const { data } = await api.delete(`/comments/${commentId}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", videoId],
      });
    },
  });
};