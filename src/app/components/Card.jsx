import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ section, title, imageUrl, route }) => {
  return (
    <Link href={`/${section}/${route}`}>
      <div className="m-4 flex flex-col items-center justify-center rounded-md  border  shadow-md">
        <Image
          className="h-auto w-36 object-contain sm:w-52"
          src={`/images/lessons/${imageUrl}`}
          width={300}
          height={300}
          alt={title}
        />
        <h2 className=" py-4 text-sm  font-semibold  sm:text-lg">{title}</h2>
      </div>
    </Link>
  );
};

export default Card;
