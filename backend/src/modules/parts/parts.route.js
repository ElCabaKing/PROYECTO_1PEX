import { Router } from "express";
import PartsController from "./parts.controller.js";
const router = Router();

router.post('/saveNewPart',PartsController.createNewPart);
router.patch('/updatePart',PartsController.updatePartStock);
router.get('/getPart',PartsController.getPartList);
export default router;