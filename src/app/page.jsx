import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@api/auth/[...nextauth]/route";
import Subjects from "@components/Subjects";
import Hero from "@components/Hero";
import { CommonQuestions } from "@components/CommonQuestions";
import Layout from "@components/Layout";
import Tabs from "@components/Tabs";
import Guidance from "@components/Guidance";

export const metadata = {
  title: "12 Grade E learning platform ",
  description: "12 Grade E learning platform ",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <Layout>
      <Hero />
      <Tabs
        tab1={<Subjects />}
        tab2={<CommonQuestions />}
        tab3={<Guidance />}
      />
    </Layout>
  );
}
