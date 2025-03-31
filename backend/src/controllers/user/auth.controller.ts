import { Response, Request, NextFunction } from "express";
import { UserService } from "../../services";

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const { token, user } = await UserService.login(email, password);
      return res.status(200).json({
        status: 1,
        data: {
          user: user,
          token: token,
        },
        message: "Đăng nhập thành công!",
      });
    } else {
      throw new Error("Vui lòng nhập đủ thông tin");
    }
  } catch (error: any) {
    return next(error?.message);
  }
};

const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const user = await UserService.createUser(req.body);
    return res.status(201).json({
      status: 1,
      data: user,
      message: "Đăng ký tài khoản thành công!",
    });
  } catch (error: any) {
    return next(error?.message);
  }
};

export const authController = { handleLogin, handleRegister };
