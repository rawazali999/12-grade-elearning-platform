"use client";
import getSubject from "@/lib/getSubject";
import React, { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { useSession } from "next-auth/react";
import getOrCreateProgress from "@/lib/getOrCreateProgress";
import Spinner from "@components/Spinner";

export default function Videos({ subject }) {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState();
  const [checkedCount, setCheckedCount] = useState(0);
  const [data, setData] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getInputStatus = () => {
    const inputs = document.querySelectorAll(".checkbox");
    const inputsArr = Array.from(inputs);
    const inputsStatus = inputsArr.map((input) => {
      return {
        id: input.id,
        title: input.nextSibling.textContent,
        src: input.videosrc,
        checked: input.checked,
      };
    });
    return inputsStatus;
  };

  useEffect(() => {
    async function getData() {
      const subjectData = await getSubject(subject);
      setData(subjectData);
      setCurrentVideo(subjectData.course1.lessons[0].src);
      setVideos(subjectData.course1.lessons);
    }
    getData();
    async function getVideos() {
      const progress = await getOrCreateProgress(
        session?.user?.email,
        data?.course1?.id,
        data?.title,
        videos,
      );
      setVideos(progress);
      const newCheckedCount = progress.filter(
        (lesson) => lesson.checked,
      ).length;
      setCheckedCount(newCheckedCount);
      setProgressValue(Math.round((newCheckedCount / videos.length) * 100));
    }
    // Call getVideos and wait for it to finish
    (async () => {
      setIsLoading(true);
      await getVideos();
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleProgress = async (e) => {
    const videoId = e.target.id;
    const isChecked = e.target.checked;

    // Optimistically update the state to avoid waiting for the server response
    // that make the input state to be updated immediately
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, checked: isChecked } : video,
      ),
    );
    setIsLoading(true);

    try {
      if (session && data) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/progress/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            courseId: data?.course1?.id,
            subject: data?.title,
            lessons: getInputStatus(),
          }),
        });
      }
    } catch (err) {}
    const newCheckedCount = checkedCount + (e.target.checked ? 1 : -1);
    setCheckedCount(newCheckedCount);
    const newProgressValue = Math.round(
      (newCheckedCount / videos.length) * 100,
    );
    setProgressValue(newProgressValue);
    setIsLoading(false);
  };

  return (
    <div className="flex  w-full flex-col p-4 text-gray-900 dark:text-gray-100">
      <div className="my-4 flex flex-col self-center text-center text-2xl">
        <h2>
          <AiOutlineYoutube className="inline-block text-2xl" />
          {data?.kurdish_title}
        </h2>
        <span>{data?.course1?.kurdish_title}</span>
      </div>

      <div className="flex w-full flex-col rounded-lg border-2 p-6  shadow-lg sm:flex-row">
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
            {isLoading ? (
              <Spinner />
            ) : (
              <div
                className="radial-progress"
                style={{ "--value": `${progressValue}` }}
              >
                {progressValue}%
              </div>
            )}
          </div>

          <div className="m-2 flex h-96 w-full flex-col overflow-y-auto  p-4  text-right ">
            {videos.map((video) => (
              <div
                key={video.id}
                className={"flex w-full   justify-between  border px-4 py-3"}
              >
                <input
                  id={video.id}
                  // my-video is a custom attribute
                  videosrc={video.src}
                  onChange={handleProgress}
                  checked={video.checked}
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
