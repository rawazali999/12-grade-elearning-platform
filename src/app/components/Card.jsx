import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, imageUrl, route }) => {
  return (
    <Link href={`/subjects/${route}`}>
      <div className="flex flex-col items-center justify-center shadow-md  rounded-md  m-4">
        <Image
          className="w-full h-80 object-contain"
          src={`/images/lessons/${imageUrl}`}
          width={300}
          height={300}
          alt={title}
        />
        <h2 className="py-4 text-lg font-semibold text-gray-700">{title}</h2>
      </div>
    </Link>
  );
};

export default Card;
