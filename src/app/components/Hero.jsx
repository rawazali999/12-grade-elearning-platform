import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-wrap py-6 ">
      <div className="mb-10 w-full sm:w-1/2">
        <div className="container mx-auto h-full sm:p-10">
          <header className="container mt-10 h-full items-center px-4 lg:mt-0 lg:flex">
            <div className="w-full">
              <h1 className="text-3xl font-bold  lg:text-5xl ">
                Welcome to 12 Grade E-Learning Platform
              </h1>
              <div className="my-4 h-2 w-20 bg-cyan-700" />
              <p className="mb-10 text-xl ">
                12 grade E-learning platform is a platform that helps 12 grade
                students to learn and practice their skills in different
                subjects.
              </p>
            </div>
          </header>
        </div>
      </div>
      <Image
        src="/images/elearning.svg"
        alt="Leafs"
        className="mb-10 h-auto w-auto sm:w-1/2 "
        width={300}
        height={300}
      />
    </div>
  );
}
