import { Router } from "express";
import chatController from "./chat.controller.js";
const router = Router();

router.post('/createNewMessage',chatController.createNewMessage);
router.post('/updatePartStatus',chatController.updatePartStatus);
router.get('/getChatbyId',chatController.getChatbyId);

export default router;