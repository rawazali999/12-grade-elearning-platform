"use client";
import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <>
      <h1 className="m-2 text-center text-3xl font-bold tracking-wider ">
        Subjects
      </h1>
      <div
        className="m-2 flex flex-wrap justify-center "
        id="subjects"
      >
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.original_title}
            imageUrl={subject.imageUrl}
            route={subject.route}
          />
        ))}
      </div>
    </>
  );
}
