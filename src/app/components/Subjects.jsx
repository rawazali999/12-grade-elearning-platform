import React from "react";
import Card from "./Card";

export const Subjects = () => {
  const subjects = [
    { id: 1, title: "Kurdish", route: "/kurdish", imageUrl: "kurdish.jpg" },
    {
      id: 2,
      title: "Arabic Part 1",
      route: "/arabic_part1",
      imageUrl: "arabic_part1.jpg",
    },
    {
      id: 3,
      title: "Arabic Part 2",
      route: "/arabic_part2",
      imageUrl: "arabic_part2.jpg",
    },
    {
      id: 4,
      title: "Sunrise 12",
      route: "/sunrise12",
      imageUrl: "sunrise12.jpg",
    },
    {
      id: 4,
      title: "Scientific Math",
      route: "/scientific-math",
      imageUrl: "scientific_math.jpg",
    },
    {
      id: 5,
      title: "Biology",
      route: "/biology",
      imageUrl: "biology.jpg",
    },

    {
      id: 6,
      title: "Physics",
      route: "/physics",
      imageUrl: "physics.jpg",
    },
    {
      id: 7,
      title: "Chemistry",
      route: "/chemistry",
      imageUrl: "chemistry.jpg",
    },
    {
      id: 8,
      title: "Literary Math",
      route: "/literary-math",
      imageUrl: "literary_math.jpg",
    },

    {
      id: 9,
      title: "Economic geography",
      route: "/economic-geography",
      imageUrl: "economic_geography.jpg",
    },
    {
      id: 10,
      title: "History",
      route: "/history",
      imageUrl: "history.jpg",
    },
    {
      id: 11,
      title: "Economy",
      route: "/economy",
      imageUrl: "economy.jpg",
    },
  ];
  return (
    <>
      <h1 className="m-2 text-center text-3xl font-bold tracking-wider dark:text-gray-100">
        Subjects
      </h1>
      <div
        className="m-2 flex flex-wrap justify-center dark:text-gray-100"
        id="subjects"
      >
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.title}
            imageUrl={subject.imageUrl}
            route={subject.route}
          />
        ))}
      </div>
    </>
  );
};
