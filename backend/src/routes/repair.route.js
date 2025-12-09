import { Router } from "express";
import RepairController from "../controller/repair.controller.js"
import { tokenAuthNx } from "../middleware/token.auth.js";
import { tokenRoleAuthNx } from "../middleware/role.auth.js";
const router = Router();

router.post("/saveRepair",tokenAuthNx,tokenRoleAuthNx(["admin"]), RepairController.ctSaveRepair);
router.get("/getRepairList",RepairController.ctGetRepairsF);
router.patch("/updateHead",RepairController.ctUpdateHead);
router.get("/getUsersRepair",tokenAuthNx,RepairController.ctGetUsersRepair);
router.get("/getRepairData",RepairController.ctGetRepairData);
router.get("/getRepairDataClient",RepairController.ctGetRepairDataUser);
router.post("/saveRepairDetail",RepairController.ctSaveRepairDetail);
router.get("/getHeaderClient",RepairController.ctGetRepairDataClient);
router.get("/getHistoryList",RepairController.ctGetHistoryList);


export default router;