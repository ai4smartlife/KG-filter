import { Document } from "mongoose";
import { UserRole } from "../types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender?: string;
  images?: string[];
  role: UserRole;
  phone_number?: string;
  identification?: string;
  device_token?: string;
  createdAt: Date;
  updatedAt: Date;
}
