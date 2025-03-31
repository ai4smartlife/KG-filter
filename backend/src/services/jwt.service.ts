import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env-value";
import type { StringValue } from "ms";

const createToken = (data: any, expiresIn?: StringValue | number) => {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: expiresIn || "30days",
  });
};

const verifyToken = (token: string) => {
  try {
    const decode = jwt.verify(token, SECRET_KEY) as any;
    return {
      error: false,
      user: decode,
    };
  } catch (error: any) {
    return {
      error: true,
      user: undefined,
    };
  }
};

const decodeToken = (token: string) => {
  try {
    const decode = jwt.verify(token, SECRET_KEY) as any;
    return decode;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const JwtService = {
  createToken,
  verifyToken,
  decodeToken,
};
