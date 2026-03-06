import { useMutation } from "@tanstack/react-query";
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