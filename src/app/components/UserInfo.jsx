import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div className="my-1 flex flex-col items-center ">
      <div className=" rounded-full bg-black p-3  text-3xl uppercase text-white ">
        {
          // return first letter of the first and last name
          session?.user?.name
            ?.split(" ")
            .map((name) => name[0])
            .join("")
        }
      </div>

      <h4 className="mx-2 mt-2 font-medium ">{session?.user?.name}</h4>
      <p className="mx-2 mt-1 text-sm font-medium">{session?.user?.email}</p>
    </div>
  );
}
