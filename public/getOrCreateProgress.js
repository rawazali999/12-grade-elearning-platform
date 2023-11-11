export default async function getOrCreateProgress(session, data, getInputStatus) {
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
        course_title:  data?.course1?.kurdish_title,
      }),
    });

    progress = await response.json();

    // If progress doesn't exist, create initial progress
    if (!progress || progress.length === 0) {
      response = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session?.user?.email,
          courseId: data?.course1?.id,
          subject: data?.title,
          title: data?.course1?.kurdish_title,
          lessons: getInputStatus,
        }),
      });

      progress = await response.json();
    }
  }

  return progress;
}