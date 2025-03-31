import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    phone_number: { type: String, require: false },
    images: [{ type: String, required: false }],
    identification: { type: String, required: false },
    faceDescriptors: { type: Object, required: false },
    role: { type: String, required: true, default: "USER" },
    device_token: { type: String, required: false, default: "" },
    conversation: [
      { type: mongoose.Schema.Types.ObjectId, ref: "conversation" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", UserSchema);
