"use client";

import Link from "next/link";
import { Lock, Mail, UserRound, AtSign } from "lucide-react";
import { useRegister } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import AuthLeft from "@/components/sections/AuthLeft";

const Register = () => {
  const router = useRouter();
  const registerMutation = useRegister();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        queryClient.setQueryData(["currentUser"], data.user);
        toast.success("Registration successful!");
        setTimeout(() => router.push("/"), 1000);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <main className="flex min-h-screen bg-zinc-950 overflow-hidden">
      <AuthLeft />

      <section className="w-full md:w-1/2 flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
              Create an <span className="text-emerald-400">Account</span>
            </h1>
            <p className="text-zinc-400">
              Want to be a creator? Join us now and start sharing.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative group">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all outline-none"
                />
              </div>

              <div className="relative group">
                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all outline-none"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all outline-none"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all outline-none"
                />
              </div>
            </div>

            <button
              disabled={registerMutation.isPending}
              className="group relative flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black p-4 rounded-2xl w-full font-bold transition-all active:scale-[0.98] disabled:opacity-60 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.4)]"
            >
              {registerMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
