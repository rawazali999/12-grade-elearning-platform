import LoginForm from "@/src/app/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return <LoginForm />;
}
