import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: {
      username: string;
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.user;

    },
  });
};


export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name?: string; bio?: string }) => {
      const res = await api.put("/auth/profile", data);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
};