import { Router } from "express";
import UserController from "./user.controller.js"

const router = Router();

router.patch("/saveSkAns",UserController.createSecurityCode);
router.post("/saveUser",UserController.createUser);
router.get("/getList",UserController.getUserList);
router.patch("/changeRol",UserController.updateUserRol);
router.patch("/changeEstado",UserController.updateUserStatus);
export default router