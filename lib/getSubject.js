export default async function getSubject(subject) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/subjects/${subject}`,
    { cache: "no-cache" },
  );
  const data = await response.json();
  return data;
}
