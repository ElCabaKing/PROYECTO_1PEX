import { Router } from "express";
import repairService from "./repair.service.js";
const router = Router();

router.get("/getRepairList",repairService.getRepairList);
router.patch("/updateHead",repairService.appUpdateHead);
router.post("/saveRepair",repairService.appSaveRepair);
router.get("/getUsersRepair",repairService.appGetUserRepairList);

export default router;