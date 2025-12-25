import { Router } from "express";
import PartsController from "./parts.controller.js";
const router = Router();

router.post('/saveNewPart',PartsController.createNewPart);
router.patch('/updatePart',PartsController.updatePartStock);
router.get('/getPart',PartsController.getPartList);
router.get('/getPartbyName',PartsController.getPartListbyName);

export default router;