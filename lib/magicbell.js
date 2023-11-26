import { ProjectClient } from "magicbell/project-client";

export const magicbell = new ProjectClient({
  apiKey: process.env.MAGICBELL_API_KEY,
  apiSecret: process.env.MAGICBELL_API_SECRET,
});
