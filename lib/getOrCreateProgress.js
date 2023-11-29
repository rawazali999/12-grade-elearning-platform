export default async function getOrCreateProgress(
  userId,
  courseId,
  subject,
  lessons,
) {
  let progress = [];
  let response;

  if (userId && courseId && subject && lessons) {
    try {
      response = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          subject: subject,
          courseId: courseId,
          lessons: lessons,
        }),
      });

      if (!response.ok) {
        // Handle error, if needed
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return [];
      }

      progress = await response.json();
    } catch (error) {
      // Handle network or other errors
      console.error("Error fetching progress:", error);
      return [];
    } finally {
    }
  }

  return progress;
}
