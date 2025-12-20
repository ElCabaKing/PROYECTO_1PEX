import { AppError } from "../../utils/AppError.js";
import { partService } from "../parts/parts.service.js";
import chatModel from "./chat.model.js";


export const chatService = {
    async createNewMessage({ message, repairId, isTeam }) {

        if (!message || !repairId || !isTeam) { throw new AppError("No se proporciono los datos necesarios", 400) }
        await chatModel.createNewMessage({ message, repairId, isTeam })
        return {
            isCorrect: true
        }
    },

    async updatePartStatus({newStock, partId, type, detailPart, newStatus}){
        await chatModel.updateDetailPartStatus({detailPart, newStatus})
        await partService.updateStock({newStock, partId, type})
    },

    async getChatbyIf({repairId}){
        console.log(repairId)
        if(!repairId){ throw new AppError("No se proporciono los datos necesarios", 400) };
       const chat =  await chatModel.getChatbyId({repairId});

       return {chat}
    },
}