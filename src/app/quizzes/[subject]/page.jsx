import React from "react";
import Layout from "@components/Layout";
import Quiz from "@components/Quiz";

export default async function Page({ params }) {
  const { subject } = params;
  const response = await fetch(
    `${process.env.BASE_URL}/api/quizzes/${subject}`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: subject }),
    },
  );

  const data = await response.json();

  return (
    <Layout>
      <h1 className="m-2 mt-20 text-center text-3xl font-bold capitalize">
        {subject} Quiz Section{" "}
      </h1>
      <div className="kurdish-font ">
        <Quiz data={data} subject={subject}/>
      </div>
    </Layout>
  );
}
