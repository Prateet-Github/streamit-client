"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // remove token
    localStorage.removeItem("token");

    // clear cached user
    queryClient.removeQueries({ queryKey: ["currentUser"] });

    // show toast
    toast.success("Logged out successfully");

    // redirect
    router.push("/login");
  };

  return logout;
}