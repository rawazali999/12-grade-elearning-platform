import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center my-1 ">
      <Image
        width={100}
        height={100}
        className="object-cover w-24 h-24 mx-2 rounded-full"
        src="/images/avatar.png"
        alt="avatar"
      />

      <h4 className="mx-2 mt-2 font-medium text-gray-800">
        {session?.user?.name}
      </h4>
      <p className="mx-2 mt-1 text-sm font-medium text-gray-600">
        {session?.user?.email}
      </p>
    </div>
  );
}
