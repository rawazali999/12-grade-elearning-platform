"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";
import ThemeToggle from "./theme/ThemeToggle";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Notifications from "@components/Notifications";

export default function Navbar() {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
    redirect("/login");
  };

  return (
    <nav className="fixed top-0 flex w-full items-center justify-between bg-cyan-900 p-3 text-white">
      {/* Logo */}
      <Link
        className="text-md flex items-center gap-1  font-semibold text-white "
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
        <p>12th Grade Platform</p>
      </Link>

      {/* Nav Links */}
      <ul className=" mx-auto hidden space-x-12 px-4 font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900 md:flex">
        <li className="mb-1">
          <Link href="/" className=" rounded px-4 py-2 text-sm font-semibold ">
            Home
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" rounded px-4 py-2 text-sm font-semibold "
            href="/quizzes"
          >
            Quizzes
          </Link>
        </li>

        <li className="mb-1">
          <Link
            className=" rounded px-4 py-2 text-sm font-semibold "
            href="/#subjects"
          >
            Subjects
          </Link>
        </li>
        <li className="mb-1">
          <Link className=" rounded px-4 py-2 text-sm font-semibold " href="#">
            Settings
          </Link>
        </li>
      </ul>

      <div className="flex items-center justify-center gap-3 ">
        <ThemeToggle />
        {/* <Link href={"/notifications"}>
          <IoMdNotificationsOutline className="cursor-pointer text-2xl" />
        </Link> */}
        <Notifications />

        <div className="dropdown dropdown-end hidden md:block">
          <div tabIndex={0} className="avatar placeholder cursor-pointer">
            <div className=" w-8 rounded-full bg-black text-neutral-content">
              <span className="text-sm font-medium text-white">
                {
                  // return first letter of the first and last name
                  session?.user?.name
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                }
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-auto bg-base-100  shadow"
          >
            <div className="flex flex-col items-center justify-center">
              <UserInfo />
              <button
                className="text-md flex w-full items-center justify-center gap-2  bg-cyan-900 px-2  py-1 text-center"
                onClick={handleSignOut}
              >
                Sign out
                <TbLogout />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-none md:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="text-2xl"
          >
            <IoMenu />
          </label>
        </div>
      </div>
    </nav>
  );
}
