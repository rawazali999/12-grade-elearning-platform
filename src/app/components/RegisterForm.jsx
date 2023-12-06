"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import sendNotification from "@lib/sendNotification";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    <div className=" flex  h-screen items-center justify-center  bg-gray-100">
      <div className="mx-auto  w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
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

          <p className="mt-1 text-center text-gray-500">
            Register to start learning
          </p>
          <form onSubmit={handleSubmit}>
            {/* Include the username field */}
            <div className="mt-4 w-full">
              <input
                className="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Include the email field */}
            <div className="mt-4 w-full">
              <input
                className="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </div>
            {/* Include the password field */}
            <div className="mt-4 w-full">
              <input
                className="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="password"
                placeholder="Password"
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Error section */}
            {error && (
              <div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
                {error}
              </div>
            )}

            <button className="my-4 w-full transform rounded-md  bg-blue-500 px-6 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center bg-gray-50 py-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            className="mx-2 text-sm font-bold text-blue-500 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
