"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";
import { redirect } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { MdQuiz } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoSettingsSharp, IoHome } from "react-icons/io5";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  flex flex-col">
          {/* this children refers to all content between navbar and footer */}
          <Navbar />
          <main>{children}</main>

          <Footer />
        </div>

        <div className="drawer-side z-20 ">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu  flex min-h-full w-72 flex-col justify-evenly  bg-slate-200 p-4 dark:bg-gray-800">
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
    </>
  );
}
