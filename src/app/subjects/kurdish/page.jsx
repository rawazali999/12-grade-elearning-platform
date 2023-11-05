import React from "react";
import Layout from "@layouts/layout";
import Image from "next/image";
import { AiOutlineFilePdf } from "react-icons/ai";
import Videos from "../../components/Videos";
export default function page() {
  return (
    <Layout>
      <section className=" h-full w-full ">
        <div className="flex h-full w-full flex-col  pt-4 text-gray-900 dark:text-slate-50 sm:flex-row sm:justify-between">
          <div className="  w-full px-4 sm:w-1/4">
            <Image
              src={"/images/lessons/kurdish.jpg"}
              width={200}
              height={300}
              alt="Movie Poster"
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
          <div className="flex w-full flex-col  px-4 text-right sm:w-2/3 ">
            <h1 className="my-6 text-xl font-bold">زمان و ئەدەبی کوردی</h1>
            <div className="flex  flex-col gap-2 self-end p-2">
              {" "}
              <a
                target="_blank"
                className="rounded border-2  p-2  font-bold  dark:text-slate-100 "
                href="https://drive.google.com/file/d/10uVFOkUN5ANtRyW1uyBhOBI0EtYEnDvQ/view"
              >
                <AiOutlineFilePdf className="inline-block text-2xl" />
                کتێبی زمان و ئەدەبی کوردی
              </a>
            </div>
            <hr />
          </div>
        </div>
        <Videos />
      </section>
    </Layout>
  );
}
