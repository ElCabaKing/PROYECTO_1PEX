import { AppError } from "../../utils/AppError.js";
import { partService } from "../parts/parts.service.js";
import chatModel from "./chat.model.js";
import jwt from 'jsonwebtoken';

export const chatService = {
    decodeToken(token) {
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode",decodedToken)
        return decodedToken;
    },
    async createNewMessage({ message, repairId, isTeam }) {

        if (!message) { throw new AppError("No se proporciono los datos necesarios", 400) }
        await chatModel.createNewMessage({ message, repairId, isTeam })
        return {
            isCorrect: true
        }
    },

    async updatePartStatus({ newStock, partId, type, detailPart, newStatus }) {
        await chatModel.updateDetailPartStatus({ detailPart, newStatus })
        if (newStatus === 3) { return }
        await partService.updateStock({ newStock, partId, type });
        return
    },

    async getChatbyIf({ repairId }) {
        if (!repairId) { throw new AppError("No se proporciono los datos necesarios", 400) };
        const chat = await chatModel.getChatbyId({ repairId });

        return { chat }
    },

    async getChatList({ token }) {
        console.log("llega service")
        if (!token) { throw new AppError("No se proporciono los datos necesarios", 400) };
        const decodedToken = this.decodeToken(token);
        console.log(decodedToken)
        const chatList = await chatModel.getHeadChatActive({userId: decodedToken.id});

        return { chatList };
    }
}