import React from "react";
import { useSession } from "next-auth/react";
// import Image from "next/image";

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div className="my-4 flex  items-center ">
      <div>
        {/* {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            width={40}
            alt="user image"
            height={40}
            className="rounded-full"
          />
        ) : ( */}
        <div className=" rounded-full bg-black p-2  text-xl uppercase text-white ">
          {session?.user?.name
            ?.split(" ")
            .map((name) => name[0])
            .join("")}
        </div>
        {/* )} */}
      </div>
      <div>
        <h4 className="text-md mx-2 font-medium text-white ">
          {session?.user?.name}
        </h4>
        <p className="mx-2 text-sm font-medium text-gray-500 dark:text-gray-300">
          {session?.user?.email}
        </p>
      </div>
    </div>
  );
}
