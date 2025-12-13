import { Router } from "express";
import RepairController from "./repair.controller.js";
import { tokenAuthNx } from "../../middleware/token.auth.js";
import { tokenRoleAuthNx } from "../../middleware/role.auth.js";
const router = Router();

router.post("/saveRepair",tokenAuthNx,tokenRoleAuthNx(["admin"]), RepairController.createNewRepair);
router.get("/getRepairList",RepairController.getToWorkList);
router.patch("/updateHead",RepairController.updateHead);
router.get("/getUsersRepair",tokenAuthNx,RepairController.getUsersRepair);
router.get("/getRepairData",RepairController.getRepairData);
router.get("/getRepairDataClient",RepairController.ctGetRepairDataUser);
router.post("/saveRepairDetail",RepairController.ctSaveRepairDetail);
router.get("/getHeaderClient",RepairController.ctGetRepairDataClient);
router.get("/getHistoryList",RepairController.ctGetHistoryList);


export default router;