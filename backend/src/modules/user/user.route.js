import { Router } from "express";
import UserController from "./user.controller.js"
import { tokenAuthNx } from "../../middleware/token.auth.js";
import { tokenRoleAuthNx } from "../../middleware/role.auth.js";
const router = Router();

router.patch("/saveSkAns",UserController.createSecurityCode);
router.post("/saveUser",UserController.createUser);
router.get("/getList",tokenAuthNx,tokenRoleAuthNx(["admin"]), UserController.getUserList);
router.patch("/changeRol",UserController.updateUserRol);
router.patch("/changeEstado",UserController.updateUserStatus);
export default router