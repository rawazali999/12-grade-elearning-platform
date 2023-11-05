import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@api/auth/[...nextauth]/route";
import Hero from "@components/Hero";
import { Subjects } from "@components/Subjects";
import { CommonQuestions } from "@components/CommonQuestions";
import Layout from "./components/Layout";

export const metadata = {
  title: "12 Grade E learning platform ",
  description: "12 Grade E learning platform ",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <Layout>
      <main>
        <Hero />
        <Subjects />
        <CommonQuestions />
      </main>
    </Layout>
  );
}
