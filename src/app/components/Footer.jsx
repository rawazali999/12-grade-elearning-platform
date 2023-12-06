import React from "react";
import Link from "next/link";
import Header from "./Header";

export default function Footer() {
  return (
    <footer className="footer flex justify-evenly bg-cyan-800 p-10 ">
      <div>
        {/* <IoMdSchool className="text-5xl text-white" /> */}
        <Header />
        <span className="text-sm text-gray-200">
          © 2023 All rights reserved.
        </span>
      </div>
      <nav className=" text-sm font-semibold  ">
        <ul>
          <li>
            <Link
              href="/"
              className="block rounded p-2   hover:bg-gray-100 hover:text-cyan-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="block rounded p-2   hover:bg-gray-100 hover:text-cyan-900"
              href="/quizzes"
            >
              Quizzes
            </Link>
          </li>

          <li>
            <Link
              className="block rounded p-2   hover:bg-gray-100 hover:text-cyan-900"
              href="/#subjects"
            >
              Subjects
            </Link>
          </li>
          <li>
            <Link
              className="block rounded p-2   hover:bg-gray-100 hover:text-cyan-900"
              href="/settings"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
