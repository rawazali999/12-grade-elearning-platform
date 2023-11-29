import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Link
      className="text-md flex items-center gap-1  font-semibold   "
      href="/"
    >
      {/* <IoMdSchool className="text-5xl text-white" /> */}
      <Image
        src={"/images/logo.png"}
        alt="logo"
        className=" h-auto w-auto "
        width={40}
        height={40}
      />
      <p>12th Grade Platform</p>
    </Link>
  );
}
