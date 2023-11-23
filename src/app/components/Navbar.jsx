"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";
import ThemeToggle from "./theme/ThemeToggle";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { IoMdSchool, IoMdNotificationsOutline } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoSettingsSharp, IoHome, IoMenu } from "react-icons/io5";

export default function Navbar({ children }) {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
    redirect("/login");
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <nav className="english flex items-center justify-between bg-cyan-900 p-3 text-white">
            {/* Logo */}
            <Link
              className="sm:text-md flex items-center gap-2 text-sm font-semibold  text-white "
              href="/"
            >
              <IoMdSchool className="text-5xl text-white" />
              <p>12 Grade E-learning Platform</p>
            </Link>

            {/* Nav Links */}
            <ul className="font-heading mx-auto hidden space-x-12 px-4 font-semibold md:flex">
              <li className="mb-1">
                <Link
                  href="/"
                  className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900"
                  href="/quizzes"
                >
                  Quizzes
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900"
                  href="/#subjects"
                >
                  Subjects
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className=" rounded px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-100 hover:text-cyan-900"
                  href="#"
                >
                  Settings
                </Link>
              </li>
            </ul>

            <div className="flex items-center justify-center gap-3 ">
              <ThemeToggle />
              <Link href={"/notifications"}>
                <IoMdNotificationsOutline className="cursor-pointer text-2xl" />
              </Link>

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
                  className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                >
                  <div className="flex flex-col items-center justify-center">
                    <UserInfo />
                    <button
                      className="text-md  flex items-center justify-center gap-2 rounded border border-gray-900 px-2 py-1  text-center leading-loose hover:bg-cyan-900  hover:text-gray-100 dark:border-gray-100 "
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
          {/* this children refers to all content between navbar and footer */}
          {children}
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu min-h-full w-72 bg-slate-200 p-4 dark:bg-gray-800 ">
            <Link
              className="sm:text-md mb-4 flex items-center gap-2  text-sm font-semibold "
              href="/"
            >
              <IoMdSchool className="text-5xl" />
              <p>12 Grade E-learning Platform</p>
            </Link>
            <hr className="bg-black" />

            <UserInfo />
            <div className="mx-2 my-4 ">
              <ul>
                <li className="mb-1">
                  <Link
                    href="/"
                    className=" flex gap-2 rounded p-3 text-lg font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                  >
                    <IoHome />
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="flex gap-2 rounded p-3 text-lg font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                    href="/quizzes"
                  >
                    <MdQuiz />
                    Quizzes
                  </Link>
                </li>

                <li className="mb-1">
                  <Link
                    className="flex gap-2 rounded p-3 text-lg font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                    href="/#subjects"
                  >
                    <FaBook />
                    Subjects
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="flex gap-2 rounded p-3 text-lg font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                    href="/settings"
                  >
                    <IoSettingsSharp />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className=" mb-3 flex items-center  justify-center gap-2 rounded bg-cyan-900  px-2  py-4 text-center text-xl font-bold text-gray-100 hover:bg-gray-100  hover:text-cyan-900 "
              onClick={handleSignOut}
            >
              Sign out
              <TbLogout />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
