import mongoose, { Schema } from "mongoose";
import { IConversation } from "../interface";

const ConversationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "content" }],
  },
  { timestamps: true }
);

export default mongoose.model<IConversation>(
  "conversation",
  ConversationSchema
);
