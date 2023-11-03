"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
        });

        if (res.error) {
          setError("Invalid Credentials");
          return;
        }

        router.replace("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-slate-300">
      <div className="">
        <h1 className="text-center bg-transparent font-semibold rounded-md text-xl m-4">
          12-Grade E-Learning Platform
        </h1>
        <div className="shadow-lg bg-slate-50 p-5 rounded-lg border-t-4 border-cyan-700">
          <h1 className="text-xl font-bold my-4 text-center">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className=" border rounded-md border-gray-300 focus:outline-cyan-700  p-2 w-72"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              className=" border rounded-md border-gray-300 focus:outline-cyan-700  p-2 w-72"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              className=" border rounded-md border-gray-300 focus:outline-cyan-700  p-2 w-72"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="bg-cyan-700 text-white rounded-md font-bold cursor-pointer px-6 py-2">
              Sign up
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-center" href={"/login"}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
