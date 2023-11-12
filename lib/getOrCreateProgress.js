export default async function getOrCreateProgress(
  userEmail,
  courseId,
  subject,
  lessons,
) {
  let progress = [];
  let response;
  if (userEmail && courseId && subject && lessons) {
    response = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        subject: subject,
        courseId: courseId,
        lessons: lessons,
      }),
    });
    progress = await response.json();
  }

  return progress;
}
