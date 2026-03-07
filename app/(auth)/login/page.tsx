"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useLogin } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        console.log("Logged In:", data);
        toast.success("Welcome back! Redirecting...");
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
    <section className="text-center flex flex-col gap-4 border border-white/40  p-8 rounded-lg shadow-md w-full max-w-md mx-4">
      <h1 className="text-2xl font-extrabold">Welcome back</h1>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="email"
            placeholder="Email"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="relative w-full">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="password"
            placeholder="Password"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          disabled={loginMutation.isPending}
          className="bg-purple-700 p-4 rounded-full w-full font-bold text-white cursor-pointer hover:bg-purple-600 transition"
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <p className="text-xml text-gray-500">
        Don't have an account?{" "}
        <span className="underline cursor-pointer font-semibold text-purple-500 hover:text-purple-700 transition">
          <Link href="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
