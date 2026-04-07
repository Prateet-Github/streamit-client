import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      await api.delete(`/video/${videoId}`);
    },

    onSuccess: () => {
      toast.success('Video deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ["myVideos"] }); // refresh dashboard automatically
    },
  });
};