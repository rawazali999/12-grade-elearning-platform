export default async function getOrCreateProgress(
  userEmail,
  id,
  subject,
  lessons,
) {
  let progress = [];
  let response;
  if (userEmail && id && subject && lessons) {
    response = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        subject: subject,
        id: id,
        lessons: lessons,
      }),
    });
    progress = await response.json();
  }

  return progress;
}
