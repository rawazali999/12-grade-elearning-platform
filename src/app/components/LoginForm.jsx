"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        callbackUrl: "/",
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      console.log("logged in successfully");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-gray-100 text-gray-950 ">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md ">
        <div className="px-6 py-4">
          <div className="mx-auto flex justify-center">
            <Link
              className="text-md flex items-center gap-1  font-semibold   "
              href="/"
            >
              {/* <IoMdSchool className="text-5xl text-white" /> */}
              <Image
                src={"/images/logo.png"}
                alt="logo"
                className=" h-auto w-auto "
                width={40}
                height={40}
              />
              <p className="text-xl text-black">12th Grade Platform</p>
            </Link>
          </div>
          <p className="mt-1 text-center text-gray-500 ">
            Login or create account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 w-full">
              <input
                className="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 w-full">
              <input
                className="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                type="password"
                placeholder="Password"
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>
            <div className="mt-4 flex items-center ">
              <button className="w-full transform rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center bg-gray-100 py-4 text-center ">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/register"
            className="mx-2 text-sm font-bold text-blue-500 hover:underline "
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
