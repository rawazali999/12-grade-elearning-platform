import React from "react";
import Layout from "@components/Layout";
import Card from "@components/Card";

export default async function QuizzesPage() {
  const subjects = await fetch(`${process.env.BASE_URL}/api/subjects`)
    .then((res) => res.json())
    .catch((error) => console.log("Error:", error));
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
