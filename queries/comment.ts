import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useAddComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content,
      parentComment,
    }: {
      content: string;
      parentComment?: string;
    }) => {
      const res = await api.post("/comment", {
        videoId,
        content,
        parentComment,
      });

      return res.data;
    },

    onSuccess: () => {
      // refetch comments after adding
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
      const res = await api.get(`/comment/replies/${commentId}`);
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
      const res = await api.get(`/comment/video/${videoId}`);
      return res.data;
    },

    enabled: !!videoId, // don't fetch if videoId is falsy
    staleTime: 1000 * 30, // cache for 30s
  });
};