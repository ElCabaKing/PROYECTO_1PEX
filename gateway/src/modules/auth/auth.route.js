import { Router } from "express";
import authService from "./auth.service.js";

const router = Router();

router.get('/authUserV',authService.authUser);

export default router