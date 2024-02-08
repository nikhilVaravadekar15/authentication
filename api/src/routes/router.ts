import express, { Router, Request, Response } from 'express'
import testController from '../controller/TestController';

const router: Router = express.Router()

router.get("/api/hello", testController.test);

export default router;
