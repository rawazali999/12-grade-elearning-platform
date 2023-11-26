import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div className="my-4 flex  items-center ">
      <div className=" rounded-full bg-black p-3  text-xl uppercase text-white ">
        {
          // return first letter of the first and last name
          session?.user?.name
            ?.split(" ")
            .map((name) => name[0])
            .join("")
        }
      </div>
      <div>
        <h4 className="text-md mx-2  font-medium ">{session?.user?.name}</h4>
        <p className="mx-2 text-sm font-medium text-gray-300">
          {session?.user?.email}
        </p>
      </div>
    </div>
  );
}
