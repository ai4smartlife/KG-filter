import { Response, NextFunction, Request } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(httpStatus.NOT_FOUND)
    .json({ status: 0, message: "Not Found" });
};

const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ status: 0, message: err });
};

export const errorController = {
  notFound,
  error,
};
