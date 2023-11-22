import React from "react";
import Layout from "@components/Layout";
import Card from "@components/Card";
import { subjects } from "@data/subjects";

export default async function QuizzesPage() {
  return (
    <Layout>
      <h1 className="m-2 text-center text-3xl font-bold tracking-wider ">
        Quizzes
      </h1>
      <div
        className="kurdish-font m-2 flex flex-wrap justify-center "
        id="quizzes"
      >
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
