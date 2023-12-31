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
import Notifications from "@components/Notifications";
import Header from "@components/Header";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 z-10  flex w-full items-center justify-between bg-cyan-900 p-3 text-white">
      {/* Logo */}
      <Header />

      {/* Nav Links */}
      <ul className=" mx-auto hidden space-x-12 px-4 font-semibold  md:flex">
        <li className="mb-1">
          <Link
            href="/"
            className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900 "
          >
            Home
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900 "
            href="/quizzes"
          >
            Quizzes
          </Link>
        </li>

        <li className="mb-1">
          <Link
            className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900 "
            href="/#subjects"
          >
            Subjects
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900 "
            href="/settings"
          >
            Settings
          </Link>
        </li>
      </ul>

      <div className="flex items-center justify-center gap-3 ">
        <ThemeToggle />
        {/* <Link href={"/notifications"}>
          <IoMdNotificationsOutline className="cursor-pointer text-2xl" />
        </Link> */}
        {session && <Notifications />}

        <div className="dropdown-end dropdown hidden md:block">
          <div tabIndex={0} className="avatar placeholder cursor-pointer">
            {/* {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                width={30}
                alt="user image"
                height={30}
                className="rounded-full"
              />
            ) : ( */}
            <div className=" text-md rounded-full bg-black  p-2 uppercase text-white ">
              {session?.user?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </div>
            {/* )} */}
          </div>
          <div
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-auto bg-base-100  shadow"
          >
            <div className="flex flex-col items-center justify-center">
              <UserInfo />
              <button
                className="text-md flex w-full items-center justify-center gap-2  bg-cyan-900 px-2  py-1 text-center"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
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
