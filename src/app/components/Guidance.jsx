// Guidance.js
import React from "react";

const Guidance = () => {
  // An array of objects containing YouTube video information
  const videos = [
    {
      title: "ئامۆژگاری زێڕینی د.عبدالواحید بۆ خوێندکارانی پۆلی 12",
      url: "https://www.youtube.com/embed/DvXXCjKxkyM",
    },
    {
      title:
        "به‌هێزترین و باشترین سیمیناری دكتۆر به‌ختیار تاڵه‌بانی بۆ پۆلی 12",
      url: "https://www.youtube.com/embed/z_gy84THXIk",
    },
    {
      title: "سمينارى د زانا أحمد قصاب چونیه‌تی سه‌عی كردن له‌ پۆلی 12",
      url: "https://www.youtube.com/embed/TQ3eQZVHsHw",
    },
    {
      title: "هاندان بۆ خوێندن | یادگارییەکانی پۆلی 12 (سێیەمی هەرێم 99.43)",
      url: "https://www.youtube.com/embed/aI2XMA4GqPM",
    },
    {
      title: "باش بخوێنە - ڤیدیۆی هاندان بۆ قوتابیان بە تایبەت بۆ (پۆلی ١٢)",
      url: "https://www.youtube.com/embed/fubWAY3NZqY",
    },
    // Add more videos as needed
  ];
  return (
    <>
      <h1 className="text-center text-2xl font-semibold">
        Guidance and Motivation
      </h1>
      <div className="kurdish-font flex w-full flex-wrap justify-center gap-4 p-2 ">
        {videos.map((video, index) => (
          <div key={index}>
            <iframe
              className="m-2 aspect-video h-40 w-full rounded-lg shadow-md sm:h-56 "
              width="auto"
              height="auto"
              src={video.url}
              title={video.title + " video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <p className="text-md p-2 text-center font-semibold">
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Guidance;
