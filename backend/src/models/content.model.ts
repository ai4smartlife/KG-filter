import mongoose, { Schema } from "mongoose";
import { IContent } from "../interface";

const ContentSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: false },
    feedback: { type: String, required: false },
    type: { type: String, required: true },
    version: { type: Number, required: true, default: 1 },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "conversation" },
  },
  { timestamps: true }
);

export default mongoose.model<IContent>("content", ContentSchema);
