import { User } from "../models";
import { comparePassword, hashPassword } from "../utils";
import { JwtService } from "./jwt.service";

const checkPassword = (
  password: string,
  hashPassword: string,
  message?: string
) => {
  return new Promise((resolve, reject) => {
    const decode = comparePassword(password, hashPassword);
    if (decode) resolve("");
    reject(new Error(message || "Mật khẩu không chính xác!"));
  });
};

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) throw new Error("Người dùng không tồn tại");
    await checkPassword(password, user.password);

    const token = JwtService.createToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone_number: user.phone_number,
      role: user.role,
      device_token: user.device_token,
    });
    return {
      token,
      user,
    };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const createUser = async (data: any) => {
  try {
    const password = await hashPassword(data?.password?.trim());
    const user = await User.create({
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      gender: data.gender,
      password: password,
    });
    return user;
  } catch (error: any) {
    if (
      error?.code === 11000 &&
      error?.keyPattern &&
      error?.keyPattern?.email
    ) {
      throw new Error("Email đã tồn tại");
    } else {
      throw new Error(error?.message);
    }
  }
};

export const UserService = {
  login,
  createUser,
  checkPassword,
};
