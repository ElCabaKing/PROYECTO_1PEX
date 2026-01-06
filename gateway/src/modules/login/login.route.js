import { Router } from "express";
import logInService  from "./login.service.js";
const router = Router();

router.post(`/login`,logInService.logIn);



export default router;