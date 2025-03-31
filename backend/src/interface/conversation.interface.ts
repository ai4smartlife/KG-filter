import { Document } from "mongoose";
import { IUser } from "./user.interface";
import { IContent } from "./content.interface";

export interface IConversation extends Document {
  title: string;
  user: IUser;
  content: IContent[];
  createdAt: Date;
  updatedAt: Date;
}
