export default async function getOrCreateProgress(
  userEmail,
  id,
  subject,
  lessons,
) {
  let progress = [];
  let response;

  if (userEmail && id && subject && lessons) {
    try {
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
