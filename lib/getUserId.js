export default async function getUserId(email) {
  const userInfo = await fetch(`${process.env.BASE_URL}/api/getUserId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  const userId = await userInfo.json();
  if (!userId) {
    return null;
  }
  return userId._id;
}
