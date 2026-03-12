"use client";

import Link from "next/link";
import { Lock, Mail, UserRound, AtSign } from "lucide-react";
import { useRegister } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

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
        console.log("Registered:", data);
        queryClient.setQueryData(["currentUser"], data.user);
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: (err: any) => {
        console.log("Error:", err.message);
        toast.error(err.response?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <main className="flex min-h-screen justify-center">
      <div className="hidden md:flex items-center justify-center w-1/2 bg-green-500" />
      <div className="md:w-1/2 flex items-center justify-center px-6">
        <section className="text-center flex flex-col gap-4 border border-green-500 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-green-500">
            Create an account
          </h1>
          <p className="text-gray-400 text-sm">
            Join StreamIt and start sharing videos with the world!
          </p>
          <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

              <input
                type="text"
                placeholder="Username"
                className="border border-green-500 p-4 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="relative w-full">
              <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

              <input
                type="text"
                placeholder="Full Name"
                className="border border-green-500 p-4 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                name="name"
                onChange={handleChange}
              />
            </div>
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
              disabled={registerMutation.isPending}
              className="bg-green-600 p-4 rounded-full w-full font-bold text-white cursor-pointer hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span className="underline cursor-pointer font-semibold text-green-500 hover:text-green-600 transition">
              <Link href="/login">Sign In</Link>
            </span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Register;
