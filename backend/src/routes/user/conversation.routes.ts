import express from "express";
import { userConversationController } from "../../controllers";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

router.get(
  "/",
  authMiddleware.checkUserLogin,
  userConversationController.getList
);

router.get(
  "/:id",
  authMiddleware.checkUserLogin,
  userConversationController.getDetail
);

router.post(
  "/ask",
  authMiddleware.checkUserLogin,
  userConversationController.getAnswer
);

export default router;
