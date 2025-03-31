import { IUser } from "@/types";
import instance from "./axios";

type RegisterType = {
  name?: string;
  email?: string;
  password?: string;
};

type LoginType = {
  email?: string;
  password?: string;
};

interface LoginResponse {
  status: number;
  data: {
    token: string;
    user: IUser;
  };
  message: string;
}

const login = (data: LoginType) => {
  return instance.post<LoginResponse>("/auth/login", data);
};

const register = (data: RegisterType) => {
  return instance.post("/auth/register", data);
};

const getAllUser = () => {
  return instance.get("/admin/users");
};

export const AuthApi = {
  login,
  register,
  getAllUser,
};
