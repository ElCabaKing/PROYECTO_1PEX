import { Router } from "express";
import UserController from "../controller/user.controller.js"

const router = Router();

router.patch("/saveSkAns",UserController.ctSaveAns);
router.get("/validateAns",UserController.ctValidateAns);

export default router