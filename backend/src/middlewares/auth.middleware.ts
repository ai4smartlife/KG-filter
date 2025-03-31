import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import { JwtService } from "../services";

const checkUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: 0,
      message: "Không có quyền truy cập",
    });
  }
  const token = authorization.split(" ")[1];
  const verify = JwtService.verifyToken(token);
  if (verify.error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ status: 0, message: "Thông tin xác thực không hợp lệ" });
  }
  res.locals.user = verify.user;
  return next();
};

export const authMiddleware = {
  checkUserLogin,
};
