import React from "react";
import Card from "./Card";
import { subjects } from "@data/subjects";

export default function Subjects() {
  return (
    <>
      <h1 className="m-2 text-center text-3xl font-bold tracking-wider ">
        Subjects
      </h1>
      <div
        className="kurdish-font m-2 flex flex-wrap justify-center "
        id="subjects"
      >
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.original_title}
            imageUrl={subject.imageUrl}
            route={subject.route}
            section="subjects"
          />
        ))}
      </div>
    </>
  );
}
