import express from "express";

import authController from "../controller/authController.js";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/signin", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

// Protected Routes
router.use(authController.protect);

router.get("/", userController.getUser);
router.patch("/setnickname", userController.setNickname);
router.get("/logout", authController.logout);
router.patch("/changepassword", authController.changePassword);

export default router;
