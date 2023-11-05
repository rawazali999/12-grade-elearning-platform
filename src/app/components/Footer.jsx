import React from "react";
import Link from "next/link";
import { IoMdSchool } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer flex justify-around bg-cyan-800 p-10 text-base-content">
      <aside>
        <IoMdSchool className="text-5xl text-white" />
        <p>
          12 Grade E-learning Platform
          <br />
          <span className="text-sm text-gray-400">
            © 2023 All rights reserved.
          </span>
        </p>
      </aside>
      <nav>
        <ul>
          <li className="mb-1">
            <Link
              href="/"
              className="block rounded p-1 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
            >
              Home
            </Link>
          </li>
          <li className="mb-1">
            <Link
              className="block rounded p-1 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
              href="#"
            >
              Quizzes
            </Link>
          </li>

          <li className="mb-1">
            <Link
              className="block rounded p-1 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
              href="/#subjects"
            >
              Subjects
            </Link>
          </li>
          <li className="mb-1">
            <Link
              className="block rounded p-1 text-sm font-semibold  hover:bg-cyan-900 hover:text-gray-100"
              href="#"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
