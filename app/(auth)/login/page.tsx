"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useLogin } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import AuthLeft from "@/components/sections/AuthLeft";

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
        queryClient.setQueryData(["currentUser"], data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <main className="flex min-h-screen bg-zinc-950 overflow-hidden">
      <AuthLeft />

      <section className="w-full md:w-1/2 flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
              Welcome <span className="text-green-500">back</span>
            </h1>
            <p className="text-zinc-400">
              Enter your details to pick up where you left off.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              disabled={loginMutation.isPending}
              className="group relative flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-black p-4 rounded-2xl w-full font-bold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 hover:text-green-600 font-semibold underline "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
