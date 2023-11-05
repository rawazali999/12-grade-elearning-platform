"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";
import ThemeToggle from "./theme/ThemeToggle";
import { TbLogout } from "react-icons/tb";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between bg-cyan-900 p-3 text-white ">
        {/* Logo */}
        <Link className="text-md font-semibold text-white " href="/">
          12 Grade E-learning Platform
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
              href="#"
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

        <div className="flex">
          <ThemeToggle />
          <button
            className="navbar-burger flex items-center p-3 text-lg text-white"
            onClick={() => setMenuOpen(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      <div
        className={`navbar-menu relative z-50 ${menuOpen ? "block" : "hidden"}`}
      >
        <div
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="navbar-backdrop fixed inset-0  opacity-25"
        />
        <aside className="fixed bottom-0 left-0 top-0 flex max-w-sm  flex-col overflow-y-auto border-r  bg-gray-50 px-8 py-4 dark:bg-slate-800 dark:text-gray-100">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <svg
                className="h-6 w-6 cursor-pointer  hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <UserInfo />
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  href="/"
                  className="block rounded p-3 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block rounded p-3 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                  href="#"
                >
                  Quizzes
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  className="block rounded p-3 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                  href="/#subjects"
                >
                  Subjects
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block rounded p-3 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                  href="#"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="my-auto">
            <button
              className=" mb-3 flex w-full items-center justify-center gap-2 rounded   border-2 border-gray-900 px-4 py-2 text-center  text-lg leading-loose hover:bg-cyan-900  dark:border-gray-100  "
              onClick={() => {
                signOut();
              }}
            >
              Sign out
              <TbLogout />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
