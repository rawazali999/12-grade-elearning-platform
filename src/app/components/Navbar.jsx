"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-cyan-950">
        <Link className="text-md text-white font-semibold " href="/">
          12 Grade E-learning Platform
        </Link>

        <button
          className="navbar-burger flex items-center text-lg text-white p-3"
          onClick={() => setMenuOpen(true)}
        >
          <RxHamburgerMenu />
        </button>
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
        <aside className="fixed top-0 left-0 bottom-0 flex flex-col w-2/3 max-w-xs p-6  bg-gray-100 border-r overflow-y-auto">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <svg
                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
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
                  className="block p-4 text-sm font-semibold text-gray-600 hover:bg-cyan-900 hover:text-gray-100 rounded"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-600 hover:bg-cyan-900 hover:text-gray-100 rounded"
                  href="#"
                >
                  Quizzes
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-600 hover:bg-cyan-900 hover:text-gray-100 rounded"
                  href="#"
                >
                  Lessons
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-600 hover:bg-cyan-900 hover:text-gray-100 rounded"
                  href="#"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button
              className="w-full block p-2 mb-2 leading-loose text-md text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>

            <p className="my-4 text-xs text-center text-gray-600"></p>
          </div>
        </aside>
      </div>
    </>
  );
}
