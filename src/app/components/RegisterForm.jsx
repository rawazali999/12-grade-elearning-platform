"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import sendNotification from "@lib/sendNotification";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }
      // register user
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      // if registration is successful, sign in user
      if (res.ok) {
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
        router.replace("/");
        await sendNotification(
          `Welcome ${name} to 12th Grade Platform`,
          "We are glad to have you here. You can now start learning with us.",
          email,
        );
        
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-slate-300 text-gray-950">
      <div className="">
        <h1 className="m-4 rounded-md bg-transparent text-center text-xl font-semibold">
          12-Grade E-Learning Platform
        </h1>
        <div className="rounded-lg border-t-4 border-cyan-700 bg-slate-50 p-5 shadow-lg">
          <h1 className="my-4 text-center text-xl font-bold">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className=" w-72 rounded-md  border border-gray-300 bg-slate-100  p-2 placeholder-gray-500 focus:outline-cyan-700"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              className=" w-72 rounded-md  border border-gray-300 bg-slate-100  p-2 placeholder-gray-500 focus:outline-cyan-700"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              type="email"
              placeholder="Email"
            />
            <input
              className=" w-72 rounded-md  border border-gray-300 bg-slate-100  p-2 placeholder-gray-500 focus:outline-cyan-700"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="cursor-pointer rounded-md bg-cyan-700 px-6 py-2 font-bold text-white">
              Sign up
            </button>
            {error && (
              <div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
                {error}
              </div>
            )}

            <Link className="mt-3 text-center text-sm" href={"/login"}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
