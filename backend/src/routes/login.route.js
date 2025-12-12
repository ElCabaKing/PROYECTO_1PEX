import { Router } from "express";
import LoginController from "../controller/login.controller.js";

const router = Router();

router.post('/login',LoginController.Login);
router.get("/logout",LoginController.LogOut)

export default router;