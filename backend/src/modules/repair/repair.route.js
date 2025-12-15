import { Router } from "express";
import RepairController from "./repair.controller.js";
import { tokenAuthNx } from "../../middleware/token.auth.js";
import { tokenRoleAuthNx } from "../../middleware/role.auth.js";
const router = Router();

// POST routes
router.post("/saveRepair",tokenAuthNx,tokenRoleAuthNx(["admin"]), RepairController.createNewRepair);
router.post("/saveRepairDetail",RepairController.createNewRepairDetail);

// GET routes
router.get("/getRepairList",RepairController.getToWorkList);
router.get("/getUsersRepair",tokenAuthNx,RepairController.getUsersRepair);
router.get("/getRepairData",RepairController.getRepairData);
router.get("/getHistoryList",RepairController.getHistoryList);

router.get("/getHeaderClient",RepairController.getRepairDataClient); //Usado por los clientes
// PATCH routes
router.patch("/updateHead",RepairController.updateHead);


export default router;