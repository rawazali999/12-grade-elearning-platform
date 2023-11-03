import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-wrap py-6 ">
      <div className="w-full sm:w-1/2 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-3xl lg:text-5xl font-bold ">
                Welcome to 12 Grade E-Learning Platform
              </h1>
              <div className="w-20 h-2 bg-cyan-700 my-4" />
              <p className="text-xl mb-10">
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
        className="w-auto h-auto sm:w-1/2 mb-10 "
        width={300}
        height={300}
      />
    </div>
  );
}
