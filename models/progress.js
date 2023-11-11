import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const progressSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    subject: { type: String, required: true },
    courseId: { type: String, required: true },
    lessons: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        checked: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true },
);

const Progress = models.Progress || mongoose.model("Progress", progressSchema);

export default Progress;
