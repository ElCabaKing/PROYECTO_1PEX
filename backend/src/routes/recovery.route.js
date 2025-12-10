import { Router } from "express";
import RecoveryController from "../controller/recovery.controller.js";
const router = Router();

router.post('/SecurityCode',RecoveryController.getSecurityCode);
router.patch('/ChangePassword',RecoveryController.updateUserPassword);

export default router;