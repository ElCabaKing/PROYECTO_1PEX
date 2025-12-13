import { Router } from "express";
import authController from './auth.controller.js'
const router = Router();

router.get('/authUserV',authController.authToken);

export default router;