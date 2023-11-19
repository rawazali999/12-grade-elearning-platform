"use client";
import React from "react";
import Layout from "@components/Layout";
import Card from "@components/Card";
import { useState, useEffect } from "react";

export default function QuizzesPage() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <Layout>
      <h1 className="m-2 text-center text-3xl font-bold tracking-wider ">
        Quizzes
      </h1>
      <div className="m-2 flex flex-wrap justify-center " id="quizzes">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.original_title}
            imageUrl={subject.imageUrl}
            route={subject.route}
            section={"quizzes"}
          />
        ))}
      </div>
    </Layout>
  );
}
