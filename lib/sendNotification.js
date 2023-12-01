import MagicBellClient, { Notification } from "@magicbell/core";
import getUserId from "@lib/getUserId";
export default async function sendNotification(title, content, email) {
  const userId = await getUserId(email);
  MagicBellClient.configure({
    apiKey: process.env.MAGICBELL_API_KEY,
    apiSecret: process.env.MAGICBELL_API_SECRET,
    userExternalId: userId,
    userEmail: email,
  });

  const notification = Notification.create({
    title: title,
    content: content,
    recipients: [{ external_id: userId }, { email: email }],
  });
}
