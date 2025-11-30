import { Router } from "express";
import roleAuth from "../middleware/role.auth.js";
import tokenAuth from "../middleware/token.auth.js";

const router = Router();

router.get('/authAdmin',tokenAuth.tokenAuthNx,roleAuth.tokenRoleAuth(["admin"]));
router.get('/authUserV',tokenAuth.tokenAuthNx,roleAuth.tokenRoleAuth(["admin","user"]));

export default router;