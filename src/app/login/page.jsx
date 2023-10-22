"use client";

import Link from "next/link";
import { useState } from "react";
// import { signIn } from "next-auth/react";
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

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-slate-300">
      <div className="">
        <h1 className="text-center bg-transparent font-semibold rounded-md text-xl m-4">
          12-Grade E-Learning Platform
        </h1>
        <div className="shadow-lg bg-slate-50  p-4 rounded-lg border-t-4 border-cyan-700">
          <h2 className="text-xl text-center font-bold my-4">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className=" border-2 rounded-md border-gray-300 focus:outline-cyan-700  p-2 w-72"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              className=" border-2 rounded-md border-gray-300 focus:outline-cyan-700  p-2 w-72"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="bg-cyan-700 text-white rounded-md font-bold cursor-pointer px-6 py-2">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-center" href={"/register"}>
              Don&apos;t have an account?{" "}
              <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
