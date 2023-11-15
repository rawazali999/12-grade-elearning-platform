import React from "react";
import Layout from "@components/Layout";
import Image from "next/image";
import { AiOutlineFilePdf } from "react-icons/ai";
import Videos from "../../components/Videos";
import getSubject from "@/lib/getSubject";
export default async function page({ params: { subject } }) {
  const data = await getSubject(subject);

  return (
    <Layout>
      <section className=" h-full w-full ">
        <div className="flex h-full w-full flex-col  pt-4 text-gray-900 dark:text-slate-50 sm:flex-row sm:justify-between">
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
            <h1 className="my-6 text-xl font-bold">{data?.kurdish_title}</h1>
            <div className="flex  flex-col gap-2 self-end p-2">
              {" "}
              <a
                target="_blank"
                className="rounded border-2  p-2  font-bold  dark:text-slate-100 "
                href={data?.book}
              >
                <AiOutlineFilePdf className="inline-block text-2xl" />
                کتێبی {data?.kurdish_title}
              </a>
            </div>
            <hr />
          </div>
        </div>
        <Videos subject={data.title} />
      </section>
    </Layout>
  );
}
