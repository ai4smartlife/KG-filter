import { IContent } from "../interface";
import { Content, Conversation } from "../models";
import { ContentType } from "../types";

type CreateContentProps = {
  type: ContentType;
  conversation: any;
  version?: number;
  question: string;
  answer?: string;
};

const createContent = async ({
  conversation,
  question,
  type,
  version = 1,
  answer,
}: CreateContentProps) => {
  try {
    const data = await Content.create({
      type: type,
      conversation: conversation,
      version: version,
      question: question,
      answer: answer,
    });
    await Conversation.findByIdAndUpdate(conversation, {
      $push: {
        content: data._id,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const ContentService = { createContent };
