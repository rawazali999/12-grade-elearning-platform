import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, imageUrl, route }) => {
  return (
    <Link href={`/subjects/${route}`}>
      <div className="m-4 flex flex-col items-center justify-center rounded-md  border  shadow-md">
        <Image
          className="h-80 w-full object-contain"
          src={`/images/lessons/${imageUrl}`}
          width={300}
          height={300}
          alt={title}
        />
        <h2 className="py-4 text-lg font-semibold text-gray-700 dark:text-gray-100">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default Card;
