"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-slate-300 text-gray-950 ">
      <div className="">
        <h1 className="m-4 rounded-md bg-transparent text-center text-xl font-semibold">
          12-Grade E-Learning Platform
        </h1>
        <div className="rounded-lg border-t-4  border-cyan-700 bg-slate-50 p-4 shadow-lg">
          <h2 className="my-4 text-center text-xl font-bold">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className=" w-72 rounded-md border border-gray-300 p-2  focus:outline-cyan-600 dark:bg-slate-200"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <input
              className=" w-72 rounded-md border border-gray-300 p-2  focus:outline-cyan-600 dark:bg-slate-200"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="cursor-pointer rounded-md bg-cyan-700 px-6 py-2 font-bold text-white">
              Login
            </button>
            {error && (
              <div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
                {error}
              </div>
            )}

            <Link className="mt-3 text-center text-sm" href={"/register"}>
              Don&apos;t have an account?{" "}
              <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
