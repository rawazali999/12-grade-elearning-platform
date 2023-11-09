"use client";
import getSubject from "@/lib/getSubject";
import React, { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { useSession } from "next-auth/react";

export default function Videos({ subject }) {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState();
  const [checkedCount, setCheckedCount] = useState(0);
  const [data, setData] = useState();

  const { data: session } = useSession();

  function getInputStatus() {
    const inputs = document.querySelectorAll(".checkbox");
    const inputsArr = Array.from(inputs);
    const inputsStatus = inputsArr.map((input) => {
      return {
        lessonId: input.id,
        checked: input.checked,
      };
    });
    return inputsStatus;
  }

  useEffect(() => {
    async function getVideos() {
      const data = await getSubject(subject);
      setVideos(data.course1.lessons);
      setCurrentVideo(data.course1.lessons[0].src);
      setData(data);
    }
    getVideos();
  }, [subject]);

  const progressValue = Math.floor((checkedCount / videos.length) * 100);

  const handleProgress = async (e) => {
    setCheckedCount(checkedCount + (e.target.checked ? 1 : -1));

    try {
      const progressExists = await fetch(
        `${process.env.NEXTAUTH_URL}/api/progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            courseId: data?.course1?.id,
            subject: data?.title,
            title: data?.course1?.kurdish_title,
            lessons: getInputStatus(),
          }),
        },
      );

      const updatedProgress = await fetch(
        `${process.env.NEXTAUTH_URL}/api/progress`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            courseId: data?.course1?.id,
            lessons: getInputStatus(),
          }),
        },
      );
    } catch (err) {}
  };

  return (
    <div className="flex  w-full flex-col  p-4">
      <div className="my-4 flex flex-col self-center text-center text-2xl">
        <h2>
          <AiOutlineYoutube className="inline-block text-2xl" />
          {data?.kurdish_title}
        </h2>
        <span>{data?.course1?.kurdish_title}</span>
      </div>

      <div className="flex w-full flex-col rounded-lg border  p-6 sm:flex-row">
        <div className="my-6 w-full sm:w-2/3">
          <iframe
            className="h-52 rounded-lg shadow-md sm:h-[400px]"
            width="100%"
            height="400"
            src={currentVideo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="w-full self-end sm:w-1/3  ">
          <div className="flex flex-row-reverse items-center justify-around p-2">
            <h2 className="pr-4 text-right text-xl tracking-wider">وانەکان</h2>
            <div
              className="radial-progress"
              style={{ "--value": `${progressValue}` }}
            >
              {progressValue}%
            </div>
          </div>

          <div className="m-2 flex h-96 w-full flex-col overflow-y-auto  p-4  text-right ">
            {videos.map((video) => (
              <div
                key={video.id}
                className={"flex w-full   justify-between  border px-4 py-3"}
              >
                <input
                  id={video.id}
                  onChange={handleProgress}
                  type="checkbox"
                  className="checkbox"
                />

                <p
                  className={`  cursor-pointer ${
                    currentVideo === video.src
                      ? "text-black dark:text-white"
                      : ""
                  }`}
                  onClick={() => setCurrentVideo(video.src)}
                >
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
