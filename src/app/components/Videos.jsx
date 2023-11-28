"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { useSession } from "next-auth/react";
import getOrCreateProgress from "@/lib/getOrCreateProgress";
import Spinner from "@components/Spinner";
import sendNotification from "@/lib/sendNotification";

export default function Videos({ subject, course }) {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState();
  const [checkedCount, setCheckedCount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrentLesson(course.lessons[0].src);

    async function fetchData() {
      setIsLoading(true);

      const progress = await getOrCreateProgress(
        session?.user?.email,
        course?.id,
        subject?.title,
        course?.lessons,
      );
      setLessons(progress);

      if (progress) {
        const newCheckedCount = progress.filter(
          (lesson) => lesson.checked,
        ).length;
        setCheckedCount(newCheckedCount);

        setProgressValue(Math.round((newCheckedCount / progress.length) * 100));
      }

      setIsLoading(false);
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // without these dependencies, the useEffect will not create a new progress or get the progress
  }, [session, subject, course, progressValue]);

  const handleProgress = async (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    setIsLoading(true);
    const newCheckedCount = checkedCount + (checked ? 1 : -1);
    setCheckedCount(newCheckedCount);
    const newProgressValue = Math.round(
      (newCheckedCount / lessons.length) * 100,
    );
    setProgressValue(newProgressValue);
    if (newProgressValue === 100) {
      await sendNotification(
        `Congratulations 👏🎉 `,
        `You have completed the ${subject?.title} subject ${course?.kurdish_title} course.`,
        session?.user?.email,
      );
    }

    try {
      if (session && subject) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/progress/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            id: course?.id,
            subject: subject?.title,
            lesson: { id, checked },
          }),
        });
      }
    } catch (err) {}

    setIsLoading(false);
  };

  return (
    <div className="mb-20 flex w-full flex-col p-4 text-gray-900 dark:text-gray-100">
      <div className="my-4 flex flex-col self-center text-center text-2xl">
        <h2>
          <AiOutlineYoutube className="inline-block text-2xl" />
          {subject?.original_title}
        </h2>
        <span>{subject?.course1?.kurdish_title}</span>
      </div>

      <div className="flex w-full flex-col rounded-lg border-2 p-6  shadow-lg sm:flex-row">
        <div className="my-6 w-full sm:w-2/3">
          <iframe
            className="h-52 rounded-lg shadow-md sm:h-[400px]"
            width="100%"
            height="400"
            src={currentLesson}
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
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={"flex w-full   justify-between  border px-4 py-3"}
              >
                <input
                  id={lesson.id}
                  onChange={handleProgress}
                  checked={lesson.checked}
                  type="checkbox"
                  className="checkbox"
                />

                <p
                  className={`  cursor-pointer ${
                    currentLesson === lesson.src
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setCurrentLesson(lesson.src)}
                >
                  {lesson.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
