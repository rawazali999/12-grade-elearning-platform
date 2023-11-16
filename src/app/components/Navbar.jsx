"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "next-auth/react";
import UserInfo from "./UserInfo";
import ThemeToggle from "./theme/ThemeToggle";
import { TbLogout } from "react-icons/tb";
import { IoMdSchool } from "react-icons/io";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdNotificationsNone } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleSignOut = () => {
    signOut();
    redirect("/login");
  };
  return (
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between bg-cyan-900 p-3 text-white ">
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

          <button
            className="navbar-burger flex items-center p-3 text-lg text-white md:hidden"
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
        <aside className="fixed bottom-0 left-0 top-0 flex max-w-sm  flex-col overflow-y-auto border-r  bg-gray-50 px-8 py-4 text-gray-950 dark:bg-slate-800 dark:text-gray-100 ">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <AiOutlineCloseCircle className="text-3xl" />
            </button>
          </div>
          <UserInfo />
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  href="/"
                  className=" text-md flex gap-2 rounded p-3 font-semibold  hover:bg-cyan-900 hover:text-gray-100"
                >
                  <AiOutlineHome />
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
              className=" mb-3 flex w-full items-center justify-center gap-2 rounded   border-2 border-gray-900 px-4 py-2 text-center  text-lg leading-loose hover:bg-cyan-900  hover:text-gray-100 dark:border-gray-100 "
              onClick={handleSignOut}
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
