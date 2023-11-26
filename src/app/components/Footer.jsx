import React from "react";
import Link from "next/link";
import { IoMdSchool } from "react-icons/io";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer flex justify-evenly bg-cyan-800 p-10 ">
      <div>
        {/* <IoMdSchool className="text-5xl text-white" /> */}
        <div className="flex items-center gap-2 ">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            className=" h-auto w-auto "
            width={60}
            height={60}
          />
          <p className="text-xl font-semibold text-white">
            12th Grade Platform
          </p>
        </div>

        <span className="text-sm text-gray-200">
          © 2023 All rights reserved.
        </span>
      </div>
      <nav className=" text-sm font-semibold ">
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
              href="#"
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
