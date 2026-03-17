import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

export const useGetUrl = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const res = await api.post("/video/upload-url", {
        fileName: file.name,
        fileType: file.type,
      });
      return res.data;
    },
  });
}