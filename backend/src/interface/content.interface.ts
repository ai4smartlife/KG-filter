import { Document } from "mongoose";
import { ContentType } from "../types";
import { IConversation } from "./conversation.interface";

export interface IContent {
  question: string;
  answer?: string;
  feedback?: string;
  type: ContentType;
  version: number;
  conversation: IConversation | string;
  createdAt?: Date;
  updatedAt?: Date;
}
