import { Response, NextFunction, Request } from "express";
import { ObjectSchema } from "yup";

const validator =
  <T>(schema: ObjectSchema<T | any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error: any) {
      if (error.inner) {
        const errorMessages = error.inner
          .map((err: any) => err.message)
          .join(", ");
        return next(errorMessages || "Sai định dạng dữ liệu đầu vào!");
      }
    }
  };

export const validationMiddleware = {
  validator,
};
