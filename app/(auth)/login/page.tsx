"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useLogin } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        console.log("Logged In:", data);
        queryClient.setQueryData(["currentUser"], data.user);
        toast.success(`Welcome back, ${data.user.name}! Redirecting...`);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: (err: any) => {
        console.log("Error:", err.message);
        toast.error(err.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <main className="flex min-h-screen justify-center">
      <div className="hidden md:flex items-center justify-center w-1/2 bg-green-500" />

      <div className="flex items-center justify-center md:w-1/2 px-6">
        <section className="text-center flex flex-col gap-4 border border-green-500  p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-green-500">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to your account to continue enjoying StreamIt
          </p>
          <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

              <input
                type="email"
                placeholder="Email"
                className="border border-green-500 p-4 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

              <input
                type="password"
                placeholder="Password"
                className="border border-green-500 p-4 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button
              disabled={loginMutation.isPending}
              className="bg-green-600 p-4 rounded-full w-full font-bold text-white cursor-pointer hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span className="underline cursor-pointer font-semibold text-green-500 hover:text-green-600 transition">
              <Link href="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
