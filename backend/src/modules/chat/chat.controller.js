import { chatAct } from "../../socket.js";
import { chatService } from "./chat.service.js";

export const createNewMessage = async (req, res, next) => {
    try {
        const { message, repairId, isTeam } = req.body;
        await chatService.createNewMessage({ message, repairId, isTeam });

        chatAct(repairId);
        return res.status(200).json({ isCorrect: true });
    }
    catch (error) {
        next(error);
    }
}


export const updatePartStatus = async (req, res, next) => {
    try {
        const {newStock, partId, type, detailPart, newStatus} = req.body;

        await chatService.updatePartStatus({newStock, partId, type, detailPart, newStatus});
        return res.status(200).json({created: true});

    }
    catch (error) {
        next(error)
    }
}


export const getChatbyId = async (req, res, next) => {
    try{
        const {repairId} = req.query;

        const {chat} = await chatService.getChatbyIf({repairId});

        return res.status(200).json(chat);
    }
    catch(error){
        next(error);
    }
};

export const getChatList = async (req, res, next) => {
    try{
        const token = req.cookies.auth_token;

        const {chatList} = await chatService.getChatList({token});

        return res.status(200).json(chatList);
    }
    catch(error){
        next(error);
    }
}

export default {
    createNewMessage,
    updatePartStatus,
    getChatbyId,
    getChatList
}