export default async function getOrCreateProgress(
  session,
  data,
  getInputStatus,
) {
  let progress = null;

  if (session && data && getInputStatus) {
    // First, try to get the existing progress
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        courseId: data?.course1?.id,
        subject: data?.title,
      }),
    });

    progress = await response.json();

    console.log("Fetched progress:", progress);

    // If progress doesn't exist, create initial progress
    if (!progress || progress.length === 0) {
      console.log("No existing progress found, creating a new one");

      response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/progress/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            courseId: data?.course1?.id,
            subject: data?.title,
            lessons: getInputStatus,
          }),
        },
      );

      progress = await response.json();
    } else {
      console.log("Existing progress found, not creating a new one");
    }
  }

  return progress;
}
