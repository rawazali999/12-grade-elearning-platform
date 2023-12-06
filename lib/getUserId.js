export default async function getUserId(email) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/getUserId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch userId: ${response.statusText}`);
    }

    const userData = await response.json();

    if (!userData || !userData._id) {
      return null;
    }

    return userData._id;
  } catch (error) {
    console.error("Error in getUserId:", error);
    // You can choose to handle or log the error here, and return an appropriate value.
    return null;
  }
}
