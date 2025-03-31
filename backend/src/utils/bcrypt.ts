import bcrypt from "bcryptjs";
import { BCRYPT_SALT } from "../env-value";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, parseInt(BCRYPT_SALT));
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
