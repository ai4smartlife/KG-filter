import express from "express";
import { authController } from "../../controllers";
import { validationMiddleware } from "../../middlewares";
import { userValidation } from "../../validations";

const router = express.Router();

router.post("/login", authController.handleLogin);
router.post(
  "/register",
  validationMiddleware.validator(userValidation.createSchema),
  authController.handleRegister
);

export default router;
