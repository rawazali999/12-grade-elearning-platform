"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-cyan-950">
        <Link className="text-md text-white font-semibold " href="/">
          12 Grade Platform
        </Link>

        <button
          className="navbar-burger flex items-center text-lg text-white p-3"
          onClick={openMenu}
        >
          <RxHamburgerMenu />
        </button>
      </nav>
      <div
        className={`navbar-menu relative z-50 ${menuOpen ? "block" : "hidden"}`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" />
        <aside className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex justify-end mb-8">
            <button onClick={closeMenu}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
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
          <div class="flex flex-col items-center  -mx-2">
            <Image
              width={100}
              height={100}
              class="object-cover w-24 h-24 mx-2 rounded-full"
              src="/images/avatar.jpg"
              alt="avatar"
            />

            <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
              John Doe
            </h4>
            <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              john@example.com
            </p>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <button
                className="w-full block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-md"
                href="#"
              >
                Log out
              </button>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2021</span>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
