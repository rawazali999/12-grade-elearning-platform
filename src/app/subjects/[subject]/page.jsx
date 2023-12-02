import React from "react";
import Layout from "@components/Layout";
import Image from "next/image";
import { AiOutlineFilePdf } from "react-icons/ai";
import Videos from "@components/Videos";
export default async function page({ params }) {
  const { subject } = params;
  const response = await fetch(
    `${process.env.BASE_URL}/api/subjects/${subject}`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: subject }),
    },
  );

  const data = await response.json();
  // console.log(data);

  return (
    <Layout>
      <section className=" kurdish-font mt-20 flex h-full w-full flex-col">
        <div className="flex h-full w-full flex-col  pt-4 sm:flex-row sm:justify-between">
          <div className="  w-full px-4 sm:w-1/4">
            <Image
              src={`/images/lessons/${data?.imageUrl}`}
              width={200}
              height={300}
              alt="Movie Poster"
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
          <div className="flex w-full flex-col  px-4 text-right sm:w-2/3 ">
            <h1 className="my-6 text-xl font-bold">{data?.original_title}</h1>
            <div className="flex  gap-2 self-end p-2">
              {data?.books.map((book, index) => (
                <a
                  key={index}
                  href={book?.src}
                  target="_blank"
                  className="flex items-center gap-2 rounded-md border p-2 text-gray-700 dark:text-gray-200"
                >
                  <AiOutlineFilePdf className="text-2xl" />
                  <span className="text-sm">{book?.title}</span>
                </a>
              ))}
            </div>
            <hr />
          </div>{" "}
        </div>
        <Videos subject={data} course={data?.course1} />
      </section>
    </Layout>
  );
}
