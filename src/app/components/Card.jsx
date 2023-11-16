import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, imageUrl, route }) => {
  return (
    <Link href={`/subjects/${route}`}>
      <div className="m-4 flex flex-col items-center justify-center rounded-md  border  shadow-md">
        <Image
          className="h-auto w-40 object-contain sm:w-52"
          src={`/images/lessons/${imageUrl}`}
          width={300}
          height={300}
          alt={title}
        />
        <h2 className="mx-2 py-4 text-sm  font-semibold text-gray-700 dark:text-gray-100 sm:text-lg">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default Card;
