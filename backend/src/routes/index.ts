import express from "express";
import adminRoute from "./admin";
import userRoute from "./user";

const router = express.Router();

router.use("/", userRoute);
router.use("/admin", adminRoute);

export default router;
