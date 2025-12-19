import { Router } from "express";
import PartsController from "./parts.controller.js";
const router = Router();

router.post('/saveNewPart',PartsController.createNewPart);
router.patch('/updatePart',PartsController.updatePartStock);

export default router;