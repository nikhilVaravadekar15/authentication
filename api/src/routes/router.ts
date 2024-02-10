import express, { Router } from 'express'
import testController from '../controller/TestController';
import authController from '../controller/AuthController';


const router: Router = express.Router()

router.post("/api/auth/sign-up", authController.signUp);
router.post("/api/auth/sign-in", authController.signIn);
// router.post("/api/auth/forget-password", testController.test);
// router.post("/api/auth/set-password", testController.test);


router.get("/api/hello", testController.test);
router.get("*", testController.notFound);

export default router;
