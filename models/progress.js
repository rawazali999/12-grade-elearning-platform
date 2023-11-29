import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const progressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    subject: { type: String, required: true },
    courseId: { type: Number, required: true },
    lessons: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        src: { type: String, required: true },
        checked: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true },
);
progressSchema.index({ userId: 1, subject: 1, courseId: 1 }, { unique: true });

const Progress = models.Progress || mongoose.model("Progress", progressSchema);

export default Progress;
