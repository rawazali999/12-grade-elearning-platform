
export default async function getSubject(subject) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/subjects/${subject}`,
    {
      next: {
        revalidate: 20,
      },
    },
  );
  const data = await response.json();
  return data;
}
