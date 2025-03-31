import { Content, Conversation, User } from "../models";
import { AIService } from "./AI.service";
import { ContentService } from "./content.service";

const getList = async (userId: string) => {
  try {
    const data = await Conversation.find({
      user: userId,
    });
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getDetail = async (userId: string, conversationId: string) => {
  try {
    const data = await Conversation.findById(conversationId, {
      user: userId,
    }).populate(["content", "title"]);
    if (!data) throw new Error("Không có dữ liệu");
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const createContent = async (
  question: string,
  userId: string,
  conversationId?: string
) => {
  try {
    let conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      conversation = await Conversation.create({
        title: question,
        user: userId,
      });
    }
    await ContentService.createContent({
      type: "ASK",
      conversation: conversation._id,
      question: question,
    });
    const answer = await ContentService.createContent({
      type: "ANSWER",
      conversation: conversation._id,
      question: question,
      answer: await AIService.answer(question),
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        conversation: [conversation._id],
      },
    });
    return answer;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const ConversationService = {
  getList,
  getDetail,
  createContent,
};
