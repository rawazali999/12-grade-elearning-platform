import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <main>
      <Navbar />
    </main>
  );
}
