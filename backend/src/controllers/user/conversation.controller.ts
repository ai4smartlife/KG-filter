import { Response, Request, NextFunction } from "express";
import { ConversationService } from "../../services";
import httpStatus from "http-status";

const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const data = await ConversationService.getList(user._id);
    return res.status(httpStatus.OK).json({
      status: 1,
      data: data,
      message: "Success",
    });
  } catch (error: any) {
    return next(error?.message);
  }
};

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const data = await ConversationService.getDetail(user._id, req.params.id);
    return res.status(httpStatus.OK).json({
      status: 1,
      data: data,
      message: "Success",
    });
  } catch (error: any) {
    return next(error?.message);
  }
};

const getAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const { conversation, question } = req.body;
    if (!question) throw new Error("Vui lòng nhập câu hỏi");
    const data = await ConversationService.createContent(
      question,
      user._id,
      conversation
    );
    return res.status(httpStatus.OK).json({
      status: 1,
      data: data,
      message: "Success",
    });
  } catch (error: any) {
    return next(error?.message);
  }
};

export const userConversationController = { getList, getDetail, getAnswer };
