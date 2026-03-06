import Link from "next/link";
import { Lock, Mail, UserRound } from "lucide-react";

const Register = () => {
  return (
    <section className="text-center flex flex-col gap-4 border border-white/40 p-8 rounded-lg shadow-md w-full max-w-md mx-4">
      <h1 className="text-2xl font-extrabold">Create an account</h1>
      <form className="flex flex-col gap-4 items-center">
        <div className="relative w-full">
          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="text"
            placeholder="Username"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
          />
        </div>

        <div className="relative w-full">
          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="text"
            placeholder="Full Name"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
          />
        </div>
        <div className="relative w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="email"
            placeholder="Email"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
          />
        </div>
        <div className="relative w-full">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

          <input
            type="password"
            placeholder="Password"
            className="border border-white/40 p-4 pl-12 rounded-full w-full focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-700 p-4 rounded-full w-full font-bold text-white cursor-pointer hover:bg-purple-600 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xml text-gray-500">
        Already have an account?{" "}
        <span className="underline cursor-pointer font-semibold text-purple-500 hover:text-purple-700 transition">
          <Link href="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
