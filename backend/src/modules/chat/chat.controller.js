import { chatService } from "./chat.service.js";

export const createNewMessage = async (req, res, next) => {
    try {
        const { message, repairId, isTeam } = req.body;

        await chatService.createNewMessage({ message, repairId, isTeam });

        return res.status(200).json({ isCorrect: isCorrect });
    }
    catch (error) {
        next(error);
    }
}


export const updatePartStatus = async (req, res, next) => {
    try {
        
    }
    catch (error) {

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
}

export default {
    createNewMessage,
    updatePartStatus,
    getChatbyId
}