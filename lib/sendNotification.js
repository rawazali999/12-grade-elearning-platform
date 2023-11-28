import MagicBellClient, { Notification } from "@magicbell/core";

export default async function sendNotification(title, content, email) {
  MagicBellClient.configure({
    apiKey: process.env.MAGICBELL_API_KEY,
    apiSecret: process.env.MAGICBELL_API_SECRET,
  });
  const notification = Notification.create({
    title: title,
    content: content,
    recipients: [{ email: email }],
  });
}
