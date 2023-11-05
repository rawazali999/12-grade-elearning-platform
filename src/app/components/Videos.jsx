"use client";
import React, { useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";

const videos = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/71Mcm7ejGMA",
    title: "بابەتی 1 - شێوازی ڕێژەی ڕاگەیاندن",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/Jx3jqaHCnyw",
    title: "بابەتی 2 - شێوازی ڕێژەی دانانی",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/dWyUYTXSV0E",
    title: "بابەتی 3 - شێوازی ڕێژەی داخوازی",
  },
  {
    id: 4,
    src: "https://www.youtube.com/embed/E6c6TxuEOgM",
    title: "بابەتی 4 - شێوازی ڕێژەی مەرجی",
  },
  {
    id: 5,
    src: "https://www.youtube.com/embed/jvJ10Icz_Ns",
    title: "بابەتی 5 - کاری چاوگی بوون",
  },
  {
    id: 6,
    src: "https://www.youtube.com/embed/Zln0P16z5wo",
    title: "بابەتی 6 - ئەرکی ( ە ) لە ڕێزمانی کوردیدا",
  },
  {
    id: 7,
    src: "https://www.youtube.com/embed/CUKzZdSvPE8",
    title: " بابەتی 7 - ئەرکی جێناوە کەسییە لکاوەکان وەک بکەر",
  },
  {
    id: 8,
    src: "https://www.youtube.com/embed/bSRqiI0zhHQ",
    title: "بابەتی 8 - ئەرکی جێناوە کەسییە لکاوەکان وەک بەرکار",
  },
  {
    id: 9,
    src: "https://www.youtube.com/embed/B8lkIAneMKs",
    title: "بابەتی 9 - ئەرکی جێناوە کەسییە لکاوەکان وەک تەواوکەری بەیاریدە",
  },
  {
    id: 10,
    src: "https://www.youtube.com/embed/_htrJnCZnWU",
    title: "بابەتی 10 - هاوەڵناو لە ڕووی ڕۆنانەوە",
  },
  {
    id: 11,
    src: "https://www.youtube.com/embed/prZ98JGzVjc",
    title: " بابەتی 11 - جۆرەکانی هاوەڵکار لە ڕووی پێکهاتنەوە",
  },
];

export default function Videos() {
  const [currentVideo, setCurrentVideo] = useState(videos[0].src);
  const [checkedCount, setCheckedCount] = useState(0);
  const progress = Math.floor((checkedCount / videos.length) * 100);

  const changeVideo = (videoSrc) => {
    setCurrentVideo(videoSrc);
  };

  return (
    <div className="flex  w-full flex-col  p-4">
      <div className="my-4 flex flex-col self-center text-2xl">
        <h2>
          <AiOutlineYoutube className="inline-block text-2xl" />
          ڤیدیۆی زمان و ئەدەبی کوردی
        </h2>
        <span>م. سالم محمد کوردی پۆلی ١٢ ڕێزمان</span>
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
              style={{ "--value": `${progress}` }}
            >
              {progress}%
            </div>
          </div>

          <div className="m-2 flex h-96 w-full flex-col overflow-y-auto  p-4  text-right ">
            {videos.map((video, index) => (
              <div
                key={index}
                className={` flex w-full   justify-between  border px-4 py-3  `}
              >
                <input
                  onChange={(e) =>
                    setCheckedCount(checkedCount + (e.target.checked ? 1 : -1))
                  }
                  type="checkbox"
                  className="checkbox"
                />

                <p
                  className={`  cursor-pointer ${
                    currentVideo === video.src
                      ? "text-black dark:text-white"
                      : ""
                  }`}
                  onClick={() => changeVideo(video.src)}
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
