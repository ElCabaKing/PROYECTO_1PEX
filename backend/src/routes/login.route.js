import { Router } from "express";
import LoginController from "../controller/login.controller.js";
import AuthToken from "../middleware/token.auth.js";
import AuthTokenRol from "../middleware/role.auth.js"

const router = Router();

router.post('/login',LoginController.Login);
router.get('/ola',AuthToken.tokenAuthNx,AuthTokenRol.tokenRoleAuth(["admin"]));
router.get("/logout",LoginController.LogOut)

export default router;