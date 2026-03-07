"use client";

import Link from "next/link";
import { Lock, Mail, UserRound } from "lucide-react";
import { useRegister } from "@/queries/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        console.log("Registered:", data);
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
    <section className="text-center flex flex-col gap-4 border border-green-500 p-8 rounded-lg shadow-md w-full max-w-md mx-4">
      <h1 className="text-2xl font-extrabold">Create an account</h1>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="text"
            placeholder="Username"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="relative w-full">
          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="text"
            placeholder="Full Name"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
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
          disabled={registerMutation.isPending}
          className="bg-green-600 p-4 rounded-full w-full font-bold text-white cursor-pointer hover:bg-green-700 transition"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-xml text-gray-500">
        Already have an account?{" "}
        <span className="underline cursor-pointer font-semibold text-green-500 hover:text-green-700 transition">
          <Link href="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
