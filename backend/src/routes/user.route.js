import { Router } from "express";
import UserController from "../controller/user.controller.js"

const router = Router();

router.patch("/saveSkAns",UserController.ctSaveAns);
router.get("/validateAns",UserController.ctValidateAns);
router.post("/saveUser",UserController.ctSaveUser);
router.get("/getList",UserController.ctGetList);
router.patch("/changeRol",UserController.ctChangeRol);
router.patch("/changeEstado",UserController.ctChangeStatus);
export default router