import express, { Router } from "express";
import testController from "../controller/TestController";
import authController from "../controller/AuthController";
import authMiddleware from "../middlewares/auth.middleware";
import UserController from "../controller/UserController";

const router: Router = express.Router();

router.post("/api/auth/sign-up", authController.signUp);
router.post("/api/auth/sign-in", authController.signIn);
router.post("/api/auth/send-otp", authController.sendOtp);
router.post("/api/auth/verify-otp", authController.verifyOtp);
router.post("/api/auth/forget-password", authController.forgetPassword);
router.post("/api/auth/reset-password", authController.resetPassword);
router.get("/api/auth/refresh", authMiddleware, authController.refresh);
router.get("/api/auth/logout", authMiddleware, authController.logout);

router.get("/api/user-data", authMiddleware, UserController.getUserData);

router.get("/api/hello", testController.test);
router.get("*", testController.notFound);

export default router;
